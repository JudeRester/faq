import {
  Card,
  Grid,
  makeStyles,
  CardHeader,
  Avatar,
  IconButton,
  Button,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { firestore } from "../../api/firebase/firebase";

import Article from "./Article";
import { Pagination } from "@material-ui/lab";
import { Articles, Page } from "../../util/types";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  root: {
    padding: "2px 4px",
    alignItems: "center",
    // display:'flex',
    width: "100%",
  },
  gridList: {
    width: 400,
    height: 400,
  },
  imageCountLessEqualTwo: {
    textAlign: "center",
    height: "100%!important",
  },
  imageCountOverTwo: {
    textAlign: "center",
    height: "50%!important",
  },
  ul: {
    justifyContent: "center",
    padding: 10,
  },
}));

const ArticleList = () => {
  const classes = useStyles();

  const [pageNum, setPageNum] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<Page>();

  const [articles, setArticles] = useState<Articles[]>();
  const [expanded, setExpanded] = useState<string | false>(false);
  const history = useHistory();
  const toWrite = () =>{
    history.push("/write")
  }
  /**
  firebase
 */
  const fetchData = useCallback(() => {
    // 받아온 데이터를 저장할 배열
    let tasksData: Articles[] = [];
    console.log("fetching articles");
    // firestore.js에서 가져온 firestore 객체
    firestore
      .collection("faqs") //  "tasks" 컬렉션 반환
      .orderBy("createDate")
      .startAfter((pageNum - 1) * 10 + 1)
      .limit(10)
      .get() // "tasks" 컬렉션의 모든 다큐먼트를 갖는 프로미스 반환
      .then((docs) => {
        // forEach 함수로 각각의 다큐먼트에 함수 실행
        docs.forEach((doc) => {
          // data(), id로 다큐먼트 필드, id 조회
          tasksData.push({ ...doc.data().article });
        });

        // console.log(tasksData);
        // tasks state에 받아온 데이터 추가
        setArticles((prevTasks) => tasksData);
      });
  }, [pageNum]);
  const fetchTotalDocs = async () => {
    console.log("fetching page data");
    let data: number;
    await firestore
      .collection("faqs")
      .doc("total")
      // .collection("total")
      .get()
      .then((docs) => {
        data = docs?.data()?.count;
        let newPageInfo: Page = {
          total: data,
          startPage: 1,
          endPage: Math.round(data / 10) + 1,
          prev: false,
          next: false,
        };
        setPageInfo((pre) => newPageInfo);
      });
  };
  // 최초 렌더링 이후에 실행하기 위해 useEffect 내부에서 함수 실행
  useEffect(() => {
    fetchTotalDocs();
    fetchData();
  }, []);

  return (
    <>
      <div style={{ minHeight: "50px", width: "1024px", margin: "auto" }}>
        <Button
          variant="outlined"
          style={{
            float: "right",
            borderColor: "green",
            color:"green"
          }}
          onClick={toWrite}

        >
          새 매뉴얼 추가
        </Button>
      </div>

      <Card style={{ maxWidth: "1024px", margin: "auto" }}>
        {articles &&
          articles.map((article: Articles) => {
            return (
              <Article
                key={article.title}
                {...article}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            );
          })}
      </Card>
      <Grid>
        {pageInfo && (
          <Pagination
            classes={{ ul: classes.ul }}
            // hideNextButton={true}
            // hidePrevButton={true}
            count={pageInfo.endPage}
            page={pageNum}
            onChange={(e: React.ChangeEvent<unknown>, value: number) => {
              setPageNum(value);
            }}
            shape="rounded"
          />
        )}
      </Grid>
    </>
  );
};

export default ArticleList;
