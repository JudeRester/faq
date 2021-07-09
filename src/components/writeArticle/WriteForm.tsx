import { Button, Paper, TextField } from "@material-ui/core";
import React from "react";
import react, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router";

/**
 * firebase
 */
import { firestore } from "../../api/firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const WriteForm = () => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const history = useHistory();

  /**
   * 게시글 작성 메소드
   *
   */
  // const submit = async () => {
  //   firestore
  //     .collection("faqs")
  //     .doc(uuidv4())
  //     .set({
  //       createDate: new Date().getTime(),
  //       article: {
  //         title,
  //         content,
  //         version: 1,
  //         newest: true,
  //       },
  //     })
  //     .then(() => {
  //       history.replace("/");
  //     })
  //     .catch((error) => {
  //       console.error("error : ", error);
  //     });
  //   console.log(title, content);
  // };

  const submitTransaction = async () => {
    await firestore
      .runTransaction(async (transaction) => {
        const res = await transaction.get(
          firestore.collection("faqs").doc("total")
        );
        if (!res.exists) {
          throw "Document does not exist";
        }
        // 기존 게시글 갯수를 가져와서 + 1
        const newTotal = res.data()?.count + 1;
        // 게시글 갯수 업데이트
        transaction.update(firestore.collection("faqs").doc("total"), {
          count: newTotal,
        });
        // 게시글 추가
        transaction.set(firestore.collection("faqs").doc(uuidv4()), {
          createDate: new Date().getTime(),
          article: {
            title,
            content,
            version: 1,
            newest: true,
          },
        });
      })
      //트랜잭션 완료 후 메인화면으로 이동
      .then(() => {
        history.replace("/");
      })
      .catch((error) => {
        console.error("error : ", error);
      });
  };

  const cancel = () => {
    history.goBack();
  };
  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];
  return (
    <>
      <div
        style={{ display: "grid", marginTop: "20px", justifyContent: "center" }}
      >
        <TextField
          id="filled-basic"
          label="제목"
          variant="filled"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{
            maxWidth: "1024px",
          }}
        />
        <ReactQuill
          //  value={text || ''}
          style={{
            maxWidth: "1024px",
            height: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
          value={content || ""}
          onChange={(content, delta, source, editor) =>
            setContent(editor.getHTML())
          }
          // theme="snow"
          modules={modules}
          formats={formats}
        />
        <div style={{ textAlignLast: "center" }}>
          <Button
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
            }}
            variant="outlined"
            color="primary"
            // onClick={submit}
            onClick={submitTransaction}
          >
            저장
          </Button>
          <Button
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
            }}
            variant="outlined"
            color="secondary"
            onClick={cancel}
          >
            취소
          </Button>
        </div>
      </div>
    </>
  );
};

export default WriteForm;
