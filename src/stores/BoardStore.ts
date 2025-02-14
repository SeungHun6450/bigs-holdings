import { makeAutoObservable } from "mobx";

class BoardStore {
  selectedPost = { id: -1, title: "", content: "", boardCategory: "" };

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedPost(post: {
    id: number;
    title: string;
    content: string;
    boardCategory: string;
  }) {
    this.selectedPost = post;
  }
}

const boardStore = new BoardStore();
export default boardStore;
