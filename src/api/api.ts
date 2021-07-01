import { Articles } from "../util/types";
import { firestore } from "./firebase/firebase";

const api = firestore
export async function fetchList() {
    let articleList: Articles[] = [];

    await firestore
      .collection("faqs")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          articleList.push({ ...doc.data().article });
        });
      });
    
    return articleList
};
export default api