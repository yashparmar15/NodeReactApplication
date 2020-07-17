import React, { Component } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
  Editor,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
  convertToRaw,
} from 'draft-js';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';

import './Answer.css';
import moment from 'moment';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      finish: false,
      answer: '',
      Submit: 'Submit',
      id: this.props.id,
      className_submit: 'btn btn-primary btn-md',
    };

    this.saveContent = (answer) => {
      console.log(answer);
      console.log(this.state.id);
      axios
        .post(`/api/questions/${this.state.id}`, {
          answer: JSON.stringify(convertToRaw(answer)),
        })
        .then(() => {
          props.history.push('/');
        });
    };

    // this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      const contentState = editorState.getCurrentContent();
      this.setState({
        answer: contentState,
      });

      this.setState({ editorState });
    };
    this.onSubmit = (e) => {
      console.log(this.state.answer);
      e.preventDefault();
      this.setState({
        Submit: 'Submiited!',
        className_submit: 'btn btn-success btn-md',
      });

      setTimeout(() => {
        this.setState({
          Submit: 'Submit',
          className_submit: 'btn btn-primary btn-md',
        });
      }, 2000);

      this.saveContent(this.state.answer);
      window.location.reload(false);
      this.props.history.push('/questions');
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
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
  handleEditorChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    if (!this.state.editorState) {
      return <h3 className='loading'>Loading...</h3>;
    }

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <Modal
        open={this.props.flag}
        onClose={this.props.close}
        classNames={{
          modal: 'answer-modal',
        }}
      >
        <h1 className='ask-question-heading'>Answers</h1>
        <div className='ask-modal-body'>
          <form method='post' onSubmit={this.onSubmit}>
            <h5 className='mt-2 mb-1'>Enter Your Answer!</h5>
            <div className='RichEditor-root'>
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={this.state.editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  keyBindingFn={this.mapKeyToEditorCommand}
                  // onEditorStateChange={this.handleEditorChange}
                  onChange={this.onChange}
                  // onSubmit={this.onSubmit}
                  placeholder='Answer..'
                  ref='editor'
                  spellCheck={true}
                />
              </div>
            </div>

            <button
              type='submit'
              onClick={this.props.close}
              className={`my-3 rounded-0 ${this.state.className_submit}`}
            >
              {this.state.Submit}{' '}
            </button>
          </form>
          <div className=''>
            <h5>All Answers ({this.props.answers.length})</h5>
            {this.props.answers.map((Ans) => (
              <span key={Ans._id} className=''>
                <div className='card my-2 border-bottom-info p-2 rounded-0'>
                  {' '}
                  <h6
                    className=''
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(JSON.parse(Ans.answer)),
                    }}
                  ></h6>{' '}
                </div>
                <div className='credential'>
                  <div className='answer-name'>
                    <kbd>~ {Ans.username}</kbd>
                  </div>
                  <div className='blockquote-footer'>
                    {moment(Ans.date).format('DD/MM/YYYY')}
                  </div>
                </div>
                <hr />
              </span>
            ))}
          </div>
        </div>
      </Modal>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className='RichEditor-controls'>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className='RichEditor-controls'>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default withRouter(Answers);
