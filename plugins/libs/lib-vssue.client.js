import Vue from "vue";
import Vssue from "vssue";
import GithubV3 from "@vssue/api-github-v3";
import "vssue/dist/vssue.css";
import Config from "@/plugins/config.js"

Vue.use(Vssue, {
  api: GithubV3,
  owner: "tsukiseele",
  repo: Config.commentRepository,
  clientId: "438b1621c4f3d263f557",
  clientSecret: "cd03774c329435a40f7363d2d9817593bf576e79"
});
