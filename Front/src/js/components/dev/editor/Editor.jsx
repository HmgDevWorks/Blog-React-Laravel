import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import axios from "axios";
import postService from "../../../services/postService";
import servicioCategorias from "../../../services/categoriesService";

import { html } from '@yoopta/exports';
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from '@yoopta/blockquote';
import Accordion from '@yoopta/accordion';
import Code from '@yoopta/code';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import File from '@yoopta/file';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import Lists from '@yoopta/lists';
import Headings from '@yoopta/headings';
import Table from '@yoopta/table';
import Divider from '@yoopta/divider';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';

// import DeatallesBlog from "./DetallesBlog";
import "./Editor.css";

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const plugins = [Paragraph, Blockquote, Accordion, Code, Embed, Image, Link, File, Callout, Video, Table, Divider];

const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

export default function Editor({ isEditable = true, post = {} }) {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState({});
  // const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState(post ? post.title : "");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(post ? post.id_categories : 0);
  // if (post) { console.log("selectedcat", selectedCategory); }

  function changeTitle(event) {
    setTitle(event.target.value);
  }

  const onChange = (value, options) => {
    setValue(value);
  };

  const deserializeHTML = useCallback((htmlString) => {
    if (!htmlString) return [];
    try {
      return html.deserialize(editor, htmlString);
    } catch (error) {
      console.error('Error deserializing HTML:', error);
      return [];
    }
  }, [editor]);

  // from @yoopta content to html string
  const serializeHTML = () => {
    const data = editor.getEditorValue();
    const htmlString = html.serialize(editor, data);
    return htmlString;
  };

  // const handlePreview = () => {
  //   setIsPreview(isPreview => !isPreview);
  // };

  const handleSave = async (status) => {
    serializeHTML();
    const userId = localStorage.getItem('userId');
    let data = { id_categories: selectedCategory, user_id: userId, title: title, content: serializeHTML(), status: status };
    let request = postService.createPost(data);
    if (post) {
      data = { id_categories: post.id_categories, user_id: post.user_id, title: title, content: serializeHTML(), status: status };
      request = postService.editPost(post.id, data);
    }
    if (!selectedCategory) {
      alert('Please select a category before saving.');
      return;
    }
    request
      .then(response => {
        console.log('Published:', response.data);
      })
      .catch(error => {
        console.error('Error publishing:', error);
      });
  };

  const deletePost = async () => {
    if (post = {}) {
      setValue([]);
      editor.setEditorValue([]);
      return;
    }
    // const userId = localStorage.getItem('userId');
    // let data = { id_categories: selectedCategory, user_id: userId, title: title, content: serializeHTML(), status: status };
    let request = postService.deletePost(post.id);
    request
      .then(response => {
        console.log('Deleted:', response.data);
      })
      .catch(error => {
        console.error('Error deleting:', error);
      });
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current || categories.length > 0) return;

    const request = servicioCategorias.getCategorias();
    hasFetched.current = true;

    request
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [categories.length]);

  useEffect(() => {
    if (post.content) {
      const deserializedValue = deserializeHTML(post.content);
      setValue(deserializedValue);
      editor.setEditorValue(deserializedValue);
    }
  }, [post, editor, deserializeHTML]);


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      {isEditable && (<div className="editor-title">
        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          id="post-title"
          defaultValue={title}
          onChange={(e) => changeTitle(e)}
        />
      </div>)}
      {isEditable && (<div className="categorie-dropdown">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Escoge categoria</span>
          </div>
          <select className="select select-bordered" onChange={handleCategoryChange} value={selectedCategory}>
            <option disabled>Elige una categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>)}
      <div className="editor">
        <YooptaEditor
          editor={editor}
          placeholder="Type text.."
          plugins={plugins}
          tools={TOOLS}
          value={value}
          onChange={onChange}
          marks={MARKS}
          readOnly={!isEditable}
        />
      </div>
      {isEditable && (
        <div className="editor-btns">
          <button className="btn" onClick={() => handleSave("published")}>Publicar</button>
          <button className="btn" onClick={() => handleSave("draft")}>Guardar</button>
          <button className="btn btn-error" onClick={deletePost}>Borrar</button>
          {/* <button className="btn" onClick={handlePreview}>Previsualizar</button> */}
        </div>)}
      {/* {isPreview && (serializeHTML())} */}
    </>
  );
}