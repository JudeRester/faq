import { Paper } from "@material-ui/core";
import ArticleList from "./ArticleList";

const List = () => {
  return (
    <Paper
      style={{ margin: "5px", padding: "10px", backgroundColor: "#e3e3e3" }}
    >
      <ArticleList />
    </Paper>
  );
};
export default List;
