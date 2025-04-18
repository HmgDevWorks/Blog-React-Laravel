import React, { useEffect, useMemo, useState, useCallback, useRef, useContext } from "react";
import axios from "axios";
import postService from "../../../services/postService";
import servicioCategorias from "../../../services/categoriesService";
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { useAlert } from "../../../bootstrap/contexts/AlertContext";
import { ErrorAlert, SuccessAlert } from '../Alerts/Alerts';
import { useTranslation } from "react-i18next";

import { html } from '@yoopta/exports';
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from '@yoopta/blockquote';
import Accordion from '@yoopta/accordion';
import Code from '@yoopta/code';
import Embed from '@yoopta/embed';
import YooptaImage from '@yoopta/image';
// import Link from '@yoopta/link';
// import File from '@yoopta/file';
import Callout from '@yoopta/callout';
// import Video from '@yoopta/video';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import Table from '@yoopta/table';
import Divider from '@yoopta/divider';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';

import "./Editor.css";
import userService from "../../../services/userService";

const uploadImageToCloudinary = async (file) => {
  try {
    // Validaciones
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      addError(t("file.notPermited")); // mostrar el error
      throw new Error(); // cortar la ejecución
    }

    if (file.size > 5 * 1024 * 1024) {
      addError(t("file.tooLarge")); // mostrar el error
      throw new Error(); // cortar la ejecución
    }

    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
    });

    if (image.width < 300 || image.height < 300) {
      addError(t("file.tooSmall"));
      throw new Error();
    }

    // ✅ Esperar y retornar directamente la respuesta
    const { data } = await userService.postImg(file);

    return {
      src: data.src,
      alt: data.alt || "cloudinary_image",
      sizes: {
        width: data.sizes?.width || 300,
        height: data.sizes?.height || 300,
      },
    };

  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const plugins = [
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Paragraph,
  YooptaImage.extend({ options: { onUpload: uploadImageToCloudinary }, }),
  NumberedList,
  BulletedList,
  TodoList,
  Accordion,
  Blockquote,
  Code,
  Embed,
  Callout,
  Table,
  Divider];

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

export default function Editor({ isEditable = true, post = null, maxLenght = null }) {
  const { t } = useTranslation();
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState({});
  const [title, setTitle] = useState(post ? post.title : "");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(post ? post.id_categories : 0);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { loggedUser } = useContext(AuthContext);

  function changeTitle(event) {
    setTitle(event.target.value);
  }

  const onChange = (value, options) => {
    setValue(() => value);
  };

  const deserializeHTML = useCallback((htmlString) => {
    if (!htmlString) return [];
    try {
      const originalConsoleLog = console.log; // Guardamos el log original
      console.log = () => { }; // Silenciamos los logs
      const content = html.deserialize(editor, htmlString);
      console.log = originalConsoleLog; // Restauramos console.log
      return content;
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

  const handleSave = async (status) => {
    serializeHTML();
    const userId = loggedUser.id;
    let data = {};
    let request = "";
    if (!post) {
      data = { id_categories: selectedCategory, user_id: userId, title: title, content: serializeHTML(), status: status };
      request = postService.createPost(data);
    } else {
      data = { id_categories: post.id_categories, title: title, content: serializeHTML(), status: status };
      request = postService.editPost(post.id, data);
    }
    if (!selectedCategory) {
      setErrorMsg(t("editor.selectCat"));
      return;
    }
    request
      .then(({ data }) => {
        setSuccessMsg(t(data.message));
      })
      .catch(error => {
        setErrorMsg(t(error.message));
      });
  };

  const deletePost = async () => {
    if (!post) {
      setValue([]);
      editor.setEditorValue([]);
      return;
    }
    postService.deletePost(post.id)
      .then(({ data }) => {
        setSuccessMsg(t(data.message));
      })
      .catch(error => {
        const data = JSON.parse(error.response.data.message);
        setErrorMsg(data.error);
      });
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!isEditable || hasFetched.current || categories.length > 0) return;

    servicioCategorias.getCategorias()
      .then(({ data }) => {
        hasFetched.current = true;
        setCategories(data);
      }).catch(error => {
        const data = JSON.parse(error.response.data.message);
        setErrorMsg(data.error);
      });
  }, [isEditable, categories.length]);

  useEffect(() => {
    if (post && post.content) {
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
        <label htmlFor="post-title">{t("editor.title")}</label>
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
            <span className="label-text">{t("editor.category")}</span>
          </div>
          <select
            className="select select-bordered"
            onChange={handleCategoryChange}
            value={selectedCategory || ""}
          >
            <option value="" disabled>
              {t("editor.selectCat")}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      )
      }
      {errorMsg && <ErrorAlert msg={errorMsg} />}
      {successMsg && <SuccessAlert msg={successMsg} />}
      <div className="editor">
        <YooptaEditor
          editor={editor}
          placeholder={t("editor.placeholder")}
          plugins={plugins}
          tools={TOOLS}
          value={value}
          onChange={onChange}
          marks={MARKS}
          readOnly={!isEditable}
        />
      </div>
      {
        isEditable && (
          <div className="editor-btns">
            <button className="btn" onClick={() => handleSave("published")}>{t("editor.publishBtn")}</button>
            <button className="btn" onClick={() => handleSave("draft")}>{t("editor.saveBtn")}</button>
            <button className="btn btn-error" onClick={deletePost}>{t("editor.deleteBtn")}</button>
          </div>)
      }
    </>
  );
}