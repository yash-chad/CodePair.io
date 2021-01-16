import React, { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
  SelectionState,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Pusher from "pusher-js";
import axios from "axios";
import BlockStyleControls from "./blockStyleControls";
import InlineStyleControls from "./inlineStylesControls";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getContent,
  saveContent,
  setContentModal,
  showToast,
} from "../../store/actions";

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

class RichEditor extends Component {
  constructor(props) {
    super();
    this.inputRef = React.createRef();
    this.state = { editorState: EditorState.createEmpty(), text: "" };
    this.focus = () => this.inputRef.current.focus();
    this.onBlur = () => {
      // console.log(this.inputRef.current.blur);
    };

    this.onChange = (editorState) => {
      // update this line
      // onChange, update editor state then notify pusher of the new editorState
      this.setState({ editorState }, () => {
        // call the function to notify Pusher of the new editor state
        this._notifyPusher(
          stateToHTML(this.state.editorState.getCurrentContent())
        );
        this._notifyPusherEditor(this.state.editorState);
      });
    }; // update ends here
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.getBlockStyle = this._getBlockStyle.bind(this);
    // this.handleSaveContent(this.state.editorState);
  }

  centralText = "";
  componentWillMount() {
    this.pusher = new Pusher("9a986e8083642e754283", {
      cluster: "ap2",
      encrypted: true,
    });
    this.channel = this.pusher.subscribe("editor");
  }

  componentDidMount() {
    let self = this;
    this.channel.bind("text-update", function (data) {
      self.setState({ text: data.text });
    });

    this.channel.bind("editor-update", function (data) {
      let newSelection = new SelectionState({
        anchorKey: data.selection.anchorKey,
        anchorOffset: data.selection.anchorOffset,
        focusKey: data.selection.focusKey,
        focusOffset: data.selection.focusOffset,
      });
      let editorState = EditorState.createWithContent(
        convertFromRaw(data.text)
      );
      const newEditorState = EditorState.forceSelection(
        editorState,
        newSelection
      );
      // TODO: try setting state if only the person is not the one editing.
      // try to solve for when the second person starts editing
      self.setState({ editorState: newEditorState });
    });
  }

  _getBlockStyle(block) {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return null;
    }
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  handleSaveContent(editorState) {
    let toSend = "";
    convertToRaw(editorState.getCurrentContent()).blocks.forEach((block) => {
      toSend = toSend + block.text + " ";
    });
    this.centralText = toSend.trim();
    if (toSend !== "") saveContent(toSend);
  }

  _notifyPusher(text) {
    axios.post("http://localhost:5000/api/pusher/save-text", { text });
  }

  _notifyPusherEditor(editorState) {
    const selection = editorState.getSelection();
    let text = convertToRaw(editorState.getCurrentContent());
    axios.post("http://localhost:5000/api/pusher/editor-text", {
      text,
      selection,
    });
  }

  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <React.Fragment>
        {/* <div className="home">
            <FontAwesomeIcon icon={faHome} />
            &nbsp; Home
          </div>
          <div className="room-name">Room name</div>
          <div className="profile">
            <FontAwesomeIcon icon={faUserCircle} /> Name
          </div> */}
        <div className="RichEditor-root">
          <div className="style-controls" style={{ background: "transparent" }}>
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />

            <div className="right">
              <button
                onClick={() => {
                  this.handleSaveContent(this.state.editorState);
                  if (this.centralText !== "")
                    this.props.showToast("Saved!", "success");
                  else
                    this.props.showToast(
                      "Empty text cannot be saved!",
                      "warning"
                    );
                }}
                className="save-editor"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.props.getContent();
                  this.props.setContentModal(true);
                }}
                className="save-editor"
              >
                Checkpoint
              </button>
            </div>
          </div>
          <div className={className} onClick={this.focus}>
            <Editor
              onBlur={this.onBlur}
              blockStyleFn={this.getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="What's on your mind?"
              ref={this.inputRef}
              spellCheck={true}
            />
          </div>
        </div>
        {/* <div className="col-12 ">
             
              <div className="notes-header container-fluid">
                <FontAwesomeIcon icon={faStickyNote} />
                <h5 style={{ fontStyle: "italic", display: "inline-block" }}>
                  &nbsp; NOTES
                </h5>
                <div style={{ flex: 1, textAlign: "right" }}>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
              <blockquote
                style={{
                  background: "#efe0ff",
                  borderLeft: "0.3rem solid #b387de",
                  cursor: "pointer",
                }}
                className="note"
              >
                dbf jhuof lk;jkidjfioj jhgudhj huiho ...
               
              </blockquote>
            </div> */}
        {/* <div className="col-12 col-md-6">
            <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
          </div> */}

        {/* Dialog!!!!!!!!!!!!!!!! */}
        <div>
          {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open responsive dialog
          </Button> */}
          <Dialog
            // fullScreen={fullScreen}
            fullWidth={true}
            open={this.props.modalOpen}
            onClose={() => this.props.setContentModal(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <div className="modal">
              <h1 className="modal-heading">Last Saved Content</h1>

              <DialogContent>
                <div className="modal-content">{this.props.text}</div>
              </DialogContent>

              <button
                onClick={() => this.props.setContentModal(false)}
                autoFocus
                className="modal-close"
              >
                Close
              </button>
            </div>
          </Dialog>
        </div>
        {/* Dialog Ends !!!!!!!!!!!!!!!!!!!1 */}
      </React.Fragment>
    );
  }
}
// export default RichEditor;
const mapStateToProps = (state) => ({
  modalOpen: state.content.modalOpen,
  text: state.content.text,
});

const mapActionToProps = {
  getContent,
  setContentModal,
  saveContent,
  showToast,
};

RichEditor.propTypes = {
  modalOpen: PropTypes.bool,
  text: PropTypes.string,
};
export default connect(mapStateToProps, mapActionToProps)(RichEditor);
