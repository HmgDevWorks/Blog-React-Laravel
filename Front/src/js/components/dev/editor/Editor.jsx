import React, { useEffect, useMemo, useState } from "react";
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

export default function Editor( { isEditable = true, postTitle = "", postText = "" } ) {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState(postText);
  // const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState(postTitle);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  function changeTitle(event) {
    setTitle(event.target.value);
  }

  const onChange = (value, options) => {
    setValue(value);
  };

  // from html to @yoopta content
  // const deserializeHTML = () => {
  //   const htmlString = '<h1>First title</h1>';
  //   const content = html.deserialize(editor, htmlString);

  //   editor.setEditorValue(content);
  // };

  // from @yoopta content to html string
  const serializeHTML = () => {
    const data = editor.getEditorValue();
    const htmlString = html.serialize(editor, data);
    console.log('html string', htmlString);
    return htmlString;
  };

  // const handlePreview = () => {
  //   setIsPreview(isPreview => !isPreview);
  // };

  const handlePublish = async () => {
    serializeHTML();
    const userId = localStorage.getItem('userId');
    const data = { id_categories: selectedCategory, user_id: userId, title: title, content: serializeHTML(), status:"published" };
    const request = postService.createPost(data);

    request
      .then(response => {
        console.log('Published:', response.data);
      })
      .catch(error => {
        console.error('Error publishing:', error);
      });
  };

  const handleSave = async () => {
    serializeHTML();
    const userId = localStorage.getItem('userId');
    const data = { id_categories: selectedCategory, user_id: userId, title: title, content: serializeHTML() };
    const request = postService.createPost(data);

    request
      .then(response => {
        console.log('Published:', response.data);
      })
      .catch(error => {
        console.error('Error publishing:', error);
      });
  };

  useEffect(() => {
    const request = servicioCategorias.getCategorias();

    request
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);

      });
  }, []);


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <div className="editor-title">
        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          id="post-title"
          defaultValue={value?.title || ''}
          onChange={(e) => changeTitle(e)}
        />
      <div className="categorie-dropdown">
      <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Escoge categoria</span>
          </div>
          <select className="select select-bordered" onChange={handleCategoryChange}>
            <option disabled selected>Elige una categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      </div>
      <div className="editor">
        <YooptaEditor
          editor={editor}
          placeholder="Type text.."
          plugins={plugins}
          tools={TOOLS}
          value={value}
          onChange={onChange}
          marks={MARKS}
        />
      </div>
      {isEditable && (
      <div className="editor-btns">
        <button className="btn" onClick={handlePublish}>Publicar</button>
        <button className="btn" onClick={handleSave}>Guardar</button>
        {/* <button className="btn" onClick={handlePreview}>Previsualizar</button> */}
      </div>)}
      {/* {isPreview && (serializeHTML())} */}
    </>
  );
}