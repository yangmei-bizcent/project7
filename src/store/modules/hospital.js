import Vue from 'vue';

const state = {
  leftMenuData: [],
  leftClickData: {},
}
const getters = {

}
const mutations = {
  setLeftMenuData(state, payload) {
    state.leftMenuData = payload;
  },
  setLeftClickData(state, payload) {
    state.leftClickData = payload;
  },
  addMenuNode(state, payload) {
    if (!payload.data.sessionChilds) {
      Vue.set(payload.data, 'sessionChilds', []);
    }
    payload.data.sessionChilds.push(payload.newChild);
    ////console.log(state.leftMenuData)
  },
  deleteMenuNode(state, payload) {
    const parent = payload.node.parent;
    const children = parent.data.sessionChilds || parent.data;
    const index = children.findIndex(d => d.$treeNodeId === payload.data.$treeNodeId);
    children.splice(index, 1);
  }
}
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
