import { p as populateCommonDb } from "./chunk-IUKPXING.CR1j2e3M.js";
import { I as ImperativeState } from "./chunk-66XRIAFR.VdRNIKvq.js";
import { E as defaultConfig_default, _ as __name, d as getConfig2, F as cleanAndMerge, G as getConfig, H as random, l as log, s as setAccTitle, g as getAccTitle, b as getAccDescription, c as setAccDescription, o as setDiagramTitle, p as getDiagramTitle, e as common_default, v as clear, j as select, u as utils_default, I as setupGraphViewbox2 } from "./mermaid.core.BIYikibP.js";
import { p as parse } from "./mermaid-parser.core.BjAFYe_e.js";
var commitType = {
  NORMAL: 0,
  REVERSE: 1,
  HIGHLIGHT: 2,
  MERGE: 3,
  CHERRY_PICK: 4
};
var DEFAULT_GITGRAPH_CONFIG = defaultConfig_default.gitGraph;
var getConfig3 = /* @__PURE__ */ __name(() => {
  const config = cleanAndMerge({
    ...DEFAULT_GITGRAPH_CONFIG,
    ...getConfig().gitGraph
  });
  return config;
}, "getConfig");
var state = new ImperativeState(() => {
  const config = getConfig3();
  const mainBranchName = config.mainBranchName;
  const mainBranchOrder = config.mainBranchOrder;
  return {
    mainBranchName,
    commits: /* @__PURE__ */ new Map(),
    head: null,
    branchConfig: /* @__PURE__ */ new Map([[mainBranchName, { name: mainBranchName, order: mainBranchOrder }]]),
    branches: /* @__PURE__ */ new Map([[mainBranchName, null]]),
    currBranch: mainBranchName,
    direction: "LR",
    seq: 0,
    options: {}
  };
});
function getID() {
  return random({ length: 7 });
}
__name(getID, "getID");
function uniqBy(list, fn) {
  const recordMap = /* @__PURE__ */ Object.create(null);
  return list.reduce((out, item) => {
    const key = fn(item);
    if (!recordMap[key]) {
      recordMap[key] = true;
      out.push(item);
    }
    return out;
  }, []);
}
__name(uniqBy, "uniqBy");
var setDirection = /* @__PURE__ */ __name(function(dir2) {
  state.records.direction = dir2;
}, "setDirection");
var setOptions = /* @__PURE__ */ __name(function(rawOptString) {
  log.debug("options str", rawOptString);
  rawOptString = rawOptString == null ? void 0 : rawOptString.trim();
  rawOptString = rawOptString || "{}";
  try {
    state.records.options = JSON.parse(rawOptString);
  } catch (e) {
    log.error("error while parsing gitGraph options", e.message);
  }
}, "setOptions");
var getOptions = /* @__PURE__ */ __name(function() {
  return state.records.options;
}, "getOptions");
var commit = /* @__PURE__ */ __name(function(commitDB) {
  let msg = commitDB.msg;
  let id = commitDB.id;
  const type = commitDB.type;
  let tags = commitDB.tags;
  log.info("commit", msg, id, type, tags);
  log.debug("Entering commit:", msg, id, type, tags);
  const config = getConfig3();
  id = common_default.sanitizeText(id, config);
  msg = common_default.sanitizeText(msg, config);
  tags = tags == null ? void 0 : tags.map((tag) => common_default.sanitizeText(tag, config));
  const newCommit = {
    id: id ? id : state.records.seq + "-" + getID(),
    message: msg,
    seq: state.records.seq++,
    type: type ?? commitType.NORMAL,
    tags: tags ?? [],
    parents: state.records.head == null ? [] : [state.records.head.id],
    branch: state.records.currBranch
  };
  state.records.head = newCommit;
  log.info("main branch", config.mainBranchName);
  state.records.commits.set(newCommit.id, newCommit);
  state.records.branches.set(state.records.currBranch, newCommit.id);
  log.debug("in pushCommit " + newCommit.id);
}, "commit");
var branch = /* @__PURE__ */ __name(function(branchDB) {
  let name = branchDB.name;
  const order = branchDB.order;
  name = common_default.sanitizeText(name, getConfig3());
  if (state.records.branches.has(name)) {
    throw new Error(
      `Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ${name}")`
    );
  }
  state.records.branches.set(name, state.records.head != null ? state.records.head.id : null);
  state.records.branchConfig.set(name, { name, order });
  checkout(name);
  log.debug("in createBranch");
}, "branch");
var merge = /* @__PURE__ */ __name((mergeDB) => {
  let otherBranch = mergeDB.branch;
  let customId = mergeDB.id;
  const overrideType = mergeDB.type;
  const customTags = mergeDB.tags;
  const config = getConfig3();
  otherBranch = common_default.sanitizeText(otherBranch, config);
  if (customId) {
    customId = common_default.sanitizeText(customId, config);
  }
  const currentBranchCheck = state.records.branches.get(state.records.currBranch);
  const otherBranchCheck = state.records.branches.get(otherBranch);
  const currentCommit = currentBranchCheck ? state.records.commits.get(currentBranchCheck) : void 0;
  const otherCommit = otherBranchCheck ? state.records.commits.get(otherBranchCheck) : void 0;
  if (currentCommit && otherCommit && currentCommit.branch === otherBranch) {
    throw new Error(`Cannot merge branch '${otherBranch}' into itself.`);
  }
  if (state.records.currBranch === otherBranch) {
    const error = new Error('Incorrect usage of "merge". Cannot merge a branch to itself');
    error.hash = {
      text: `merge ${otherBranch}`,
      token: `merge ${otherBranch}`,
      expected: ["branch abc"]
    };
    throw error;
  }
  if (currentCommit === void 0 || !currentCommit) {
    const error = new Error(
      `Incorrect usage of "merge". Current branch (${state.records.currBranch})has no commits`
    );
    error.hash = {
      text: `merge ${otherBranch}`,
      token: `merge ${otherBranch}`,
      expected: ["commit"]
    };
    throw error;
  }
  if (!state.records.branches.has(otherBranch)) {
    const error = new Error(
      'Incorrect usage of "merge". Branch to be merged (' + otherBranch + ") does not exist"
    );
    error.hash = {
      text: `merge ${otherBranch}`,
      token: `merge ${otherBranch}`,
      expected: [`branch ${otherBranch}`]
    };
    throw error;
  }
  if (otherCommit === void 0 || !otherCommit) {
    const error = new Error(
      'Incorrect usage of "merge". Branch to be merged (' + otherBranch + ") has no commits"
    );
    error.hash = {
      text: `merge ${otherBranch}`,
      token: `merge ${otherBranch}`,
      expected: ['"commit"']
    };
    throw error;
  }
  if (currentCommit === otherCommit) {
    const error = new Error('Incorrect usage of "merge". Both branches have same head');
    error.hash = {
      text: `merge ${otherBranch}`,
      token: `merge ${otherBranch}`,
      expected: ["branch abc"]
    };
    throw error;
  }
  if (customId && state.records.commits.has(customId)) {
    const error = new Error(
      'Incorrect usage of "merge". Commit with id:' + customId + " already exists, use different custom Id"
    );
    error.hash = {
      text: `merge ${otherBranch} ${customId} ${overrideType} ${customTags == null ? void 0 : customTags.join(" ")}`,
      token: `merge ${otherBranch} ${customId} ${overrideType} ${customTags == null ? void 0 : customTags.join(" ")}`,
      expected: [
        `merge ${otherBranch} ${customId}_UNIQUE ${overrideType} ${customTags == null ? void 0 : customTags.join(" ")}`
      ]
    };
    throw error;
  }
  const verifiedBranch = otherBranchCheck ? otherBranchCheck : "";
  const commit2 = {
    id: customId || `${state.records.seq}-${getID()}`,
    message: `merged branch ${otherBranch} into ${state.records.currBranch}`,
    seq: state.records.seq++,
    parents: state.records.head == null ? [] : [state.records.head.id, verifiedBranch],
    branch: state.records.currBranch,
    type: commitType.MERGE,
    customType: overrideType,
    customId: customId ? true : false,
    tags: customTags ?? []
  };
  state.records.head = commit2;
  state.records.commits.set(commit2.id, commit2);
  state.records.branches.set(state.records.currBranch, commit2.id);
  log.debug(state.records.branches);
  log.debug("in mergeBranch");
}, "merge");
var cherryPick = /* @__PURE__ */ __name(function(cherryPickDB) {
  let sourceId = cherryPickDB.id;
  let targetId = cherryPickDB.targetId;
  let tags = cherryPickDB.tags;
  let parentCommitId = cherryPickDB.parent;
  log.debug("Entering cherryPick:", sourceId, targetId, tags);
  const config = getConfig3();
  sourceId = common_default.sanitizeText(sourceId, config);
  targetId = common_default.sanitizeText(targetId, config);
  tags = tags == null ? void 0 : tags.map((tag) => common_default.sanitizeText(tag, config));
  parentCommitId = common_default.sanitizeText(parentCommitId, config);
  if (!sourceId || !state.records.commits.has(sourceId)) {
    const error = new Error(
      'Incorrect usage of "cherryPick". Source commit id should exist and provided'
    );
    error.hash = {
      text: `cherryPick ${sourceId} ${targetId}`,
      token: `cherryPick ${sourceId} ${targetId}`,
      expected: ["cherry-pick abc"]
    };
    throw error;
  }
  const sourceCommit = state.records.commits.get(sourceId);
  if (sourceCommit === void 0 || !sourceCommit) {
    throw new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');
  }
  if (parentCommitId && !(Array.isArray(sourceCommit.parents) && sourceCommit.parents.includes(parentCommitId))) {
    const error = new Error(
      "Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit."
    );
    throw error;
  }
  const sourceCommitBranch = sourceCommit.branch;
  if (sourceCommit.type === commitType.MERGE && !parentCommitId) {
    const error = new Error(
      "Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified."
    );
    throw error;
  }
  if (!targetId || !state.records.commits.has(targetId)) {
    if (sourceCommitBranch === state.records.currBranch) {
      const error = new Error(
        'Incorrect usage of "cherryPick". Source commit is already on current branch'
      );
      error.hash = {
        text: `cherryPick ${sourceId} ${targetId}`,
        token: `cherryPick ${sourceId} ${targetId}`,
        expected: ["cherry-pick abc"]
      };
      throw error;
    }
    const currentCommitId = state.records.branches.get(state.records.currBranch);
    if (currentCommitId === void 0 || !currentCommitId) {
      const error = new Error(
        `Incorrect usage of "cherry-pick". Current branch (${state.records.currBranch})has no commits`
      );
      error.hash = {
        text: `cherryPick ${sourceId} ${targetId}`,
        token: `cherryPick ${sourceId} ${targetId}`,
        expected: ["cherry-pick abc"]
      };
      throw error;
    }
    const currentCommit = state.records.commits.get(currentCommitId);
    if (currentCommit === void 0 || !currentCommit) {
      const error = new Error(
        `Incorrect usage of "cherry-pick". Current branch (${state.records.currBranch})has no commits`
      );
      error.hash = {
        text: `cherryPick ${sourceId} ${targetId}`,
        token: `cherryPick ${sourceId} ${targetId}`,
        expected: ["cherry-pick abc"]
      };
      throw error;
    }
    const commit2 = {
      id: state.records.seq + "-" + getID(),
      message: `cherry-picked ${sourceCommit == null ? void 0 : sourceCommit.message} into ${state.records.currBranch}`,
      seq: state.records.seq++,
      parents: state.records.head == null ? [] : [state.records.head.id, sourceCommit.id],
      branch: state.records.currBranch,
      type: commitType.CHERRY_PICK,
      tags: tags ? tags.filter(Boolean) : [
        `cherry-pick:${sourceCommit.id}${sourceCommit.type === commitType.MERGE ? `|parent:${parentCommitId}` : ""}`
      ]
    };
    state.records.head = commit2;
    state.records.commits.set(commit2.id, commit2);
    state.records.branches.set(state.records.currBranch, commit2.id);
    log.debug(state.records.branches);
    log.debug("in cherryPick");
  }
}, "cherryPick");
var checkout = /* @__PURE__ */ __name(function(branch2) {
  branch2 = common_default.sanitizeText(branch2, getConfig3());
  if (!state.records.branches.has(branch2)) {
    const error = new Error(
      `Trying to checkout branch which is not yet created. (Help try using "branch ${branch2}")`
    );
    error.hash = {
      text: `checkout ${branch2}`,
      token: `checkout ${branch2}`,
      expected: [`branch ${branch2}`]
    };
    throw error;
  } else {
    state.records.currBranch = branch2;
    const id = state.records.branches.get(state.records.currBranch);
    if (id === void 0 || !id) {
      state.records.head = null;
    } else {
      state.records.head = state.records.commits.get(id) ?? null;
    }
  }
}, "checkout");
function upsert(arr, key, newVal) {
  const index = arr.indexOf(key);
  if (index === -1) {
    arr.push(newVal);
  } else {
    arr.splice(index, 1, newVal);
  }
}
__name(upsert, "upsert");
function prettyPrintCommitHistory(commitArr) {
  const commit2 = commitArr.reduce((out, commit3) => {
    if (out.seq > commit3.seq) {
      return out;
    }
    return commit3;
  }, commitArr[0]);
  let line = "";
  commitArr.forEach(function(c) {
    if (c === commit2) {
      line += "	*";
    } else {
      line += "	|";
    }
  });
  const label = [line, commit2.id, commit2.seq];
  for (const branch2 in state.records.branches) {
    if (state.records.branches.get(branch2) === commit2.id) {
      label.push(branch2);
    }
  }
  log.debug(label.join(" "));
  if (commit2.parents && commit2.parents.length == 2 && commit2.parents[0] && commit2.parents[1]) {
    const newCommit = state.records.commits.get(commit2.parents[0]);
    upsert(commitArr, commit2, newCommit);
    if (commit2.parents[1]) {
      commitArr.push(state.records.commits.get(commit2.parents[1]));
    }
  } else if (commit2.parents.length == 0) {
    return;
  } else {
    if (commit2.parents[0]) {
      const newCommit = state.records.commits.get(commit2.parents[0]);
      upsert(commitArr, commit2, newCommit);
    }
  }
  commitArr = uniqBy(commitArr, (c) => c.id);
  prettyPrintCommitHistory(commitArr);
}
__name(prettyPrintCommitHistory, "prettyPrintCommitHistory");
var prettyPrint = /* @__PURE__ */ __name(function() {
  log.debug(state.records.commits);
  const node = getCommitsArray()[0];
  prettyPrintCommitHistory([node]);
}, "prettyPrint");
var clear2 = /* @__PURE__ */ __name(function() {
  state.reset();
  clear();
}, "clear");
var getBranchesAsObjArray = /* @__PURE__ */ __name(function() {
  const branchesArray = [...state.records.branchConfig.values()].map((branchConfig, i) => {
    if (branchConfig.order !== null && branchConfig.order !== void 0) {
      return branchConfig;
    }
    return {
      ...branchConfig,
      order: parseFloat(`0.${i}`)
    };
  }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(({ name }) => ({ name }));
  return branchesArray;
}, "getBranchesAsObjArray");
var getBranches = /* @__PURE__ */ __name(function() {
  return state.records.branches;
}, "getBranches");
var getCommits = /* @__PURE__ */ __name(function() {
  return state.records.commits;
}, "getCommits");
var getCommitsArray = /* @__PURE__ */ __name(function() {
  const commitArr = [...state.records.commits.values()];
  commitArr.forEach(function(o) {
    log.debug(o.id);
  });
  commitArr.sort((a, b) => a.seq - b.seq);
  return commitArr;
}, "getCommitsArray");
var getCurrentBranch = /* @__PURE__ */ __name(function() {
  return state.records.currBranch;
}, "getCurrentBranch");
var getDirection = /* @__PURE__ */ __name(function() {
  return state.records.direction;
}, "getDirection");
var getHead = /* @__PURE__ */ __name(function() {
  return state.records.head;
}, "getHead");
var db = {
  commitType,
  getConfig: getConfig3,
  setDirection,
  setOptions,
  getOptions,
  commit,
  branch,
  merge,
  cherryPick,
  checkout,
  //reset,
  prettyPrint,
  clear: clear2,
  getBranchesAsObjArray,
  getBranches,
  getCommits,
  getCommitsArray,
  getCurrentBranch,
  getDirection,
  getHead,
  setAccTitle,
  getAccTitle,
  getAccDescription,
  setAccDescription,
  setDiagramTitle,
  getDiagramTitle
};
var populate = /* @__PURE__ */ __name((ast, db2) => {
  populateCommonDb(ast, db2);
  if (ast.dir) {
    db2.setDirection(ast.dir);
  }
  for (const statement of ast.statements) {
    parseStatement(statement, db2);
  }
}, "populate");
var parseStatement = /* @__PURE__ */ __name((statement, db2) => {
  const parsers = {
    Commit: /* @__PURE__ */ __name((stmt) => db2.commit(parseCommit(stmt)), "Commit"),
    Branch: /* @__PURE__ */ __name((stmt) => db2.branch(parseBranch(stmt)), "Branch"),
    Merge: /* @__PURE__ */ __name((stmt) => db2.merge(parseMerge(stmt)), "Merge"),
    Checkout: /* @__PURE__ */ __name((stmt) => db2.checkout(parseCheckout(stmt)), "Checkout"),
    CherryPicking: /* @__PURE__ */ __name((stmt) => db2.cherryPick(parseCherryPicking(stmt)), "CherryPicking")
  };
  const parser2 = parsers[statement.$type];
  if (parser2) {
    parser2(statement);
  } else {
    log.error(`Unknown statement type: ${statement.$type}`);
  }
}, "parseStatement");
var parseCommit = /* @__PURE__ */ __name((commit2) => {
  const commitDB = {
    id: commit2.id,
    msg: commit2.message ?? "",
    type: commit2.type !== void 0 ? commitType[commit2.type] : commitType.NORMAL,
    tags: commit2.tags ?? void 0
  };
  return commitDB;
}, "parseCommit");
var parseBranch = /* @__PURE__ */ __name((branch2) => {
  const branchDB = {
    name: branch2.name,
    order: branch2.order ?? 0
  };
  return branchDB;
}, "parseBranch");
var parseMerge = /* @__PURE__ */ __name((merge2) => {
  const mergeDB = {
    branch: merge2.branch,
    id: merge2.id ?? "",
    type: merge2.type !== void 0 ? commitType[merge2.type] : void 0,
    tags: merge2.tags ?? void 0
  };
  return mergeDB;
}, "parseMerge");
var parseCheckout = /* @__PURE__ */ __name((checkout2) => {
  const branch2 = checkout2.branch;
  return branch2;
}, "parseCheckout");
var parseCherryPicking = /* @__PURE__ */ __name((cherryPicking) => {
  var _a;
  const cherryPickDB = {
    id: cherryPicking.id,
    targetId: "",
    tags: ((_a = cherryPicking.tags) == null ? void 0 : _a.length) === 0 ? void 0 : cherryPicking.tags,
    parent: cherryPicking.parent
  };
  return cherryPickDB;
}, "parseCherryPicking");
var parser = {
  parse: /* @__PURE__ */ __name(async (input) => {
    const ast = await parse("gitGraph", input);
    log.debug(ast);
    populate(ast, db);
  }, "parse")
};
var DEFAULT_CONFIG = getConfig2();
var DEFAULT_GITGRAPH_CONFIG2 = DEFAULT_CONFIG == null ? void 0 : DEFAULT_CONFIG.gitGraph;
var LAYOUT_OFFSET = 10;
var COMMIT_STEP = 40;
var PX = 4;
var PY = 2;
var THEME_COLOR_LIMIT = 8;
var branchPos = /* @__PURE__ */ new Map();
var commitPos = /* @__PURE__ */ new Map();
var defaultPos = 30;
var allCommitsDict = /* @__PURE__ */ new Map();
var lanes = [];
var maxPos = 0;
var dir = "LR";
var clear3 = /* @__PURE__ */ __name(() => {
  branchPos.clear();
  commitPos.clear();
  allCommitsDict.clear();
  maxPos = 0;
  lanes = [];
  dir = "LR";
}, "clear");
var drawText = /* @__PURE__ */ __name((txt) => {
  const svgLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const rows = typeof txt === "string" ? txt.split(/\\n|\n|<br\s*\/?>/gi) : txt;
  rows.forEach((row) => {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
    tspan.setAttribute("dy", "1em");
    tspan.setAttribute("x", "0");
    tspan.setAttribute("class", "row");
    tspan.textContent = row.trim();
    svgLabel.appendChild(tspan);
  });
  return svgLabel;
}, "drawText");
var findClosestParent = /* @__PURE__ */ __name((parents) => {
  let closestParent;
  let comparisonFunc;
  let targetPosition;
  if (dir === "BT") {
    comparisonFunc = /* @__PURE__ */ __name((a, b) => a <= b, "comparisonFunc");
    targetPosition = Infinity;
  } else {
    comparisonFunc = /* @__PURE__ */ __name((a, b) => a >= b, "comparisonFunc");
    targetPosition = 0;
  }
  parents.forEach((parent) => {
    var _a, _b;
    const parentPosition = dir === "TB" || dir == "BT" ? (_a = commitPos.get(parent)) == null ? void 0 : _a.y : (_b = commitPos.get(parent)) == null ? void 0 : _b.x;
    if (parentPosition !== void 0 && comparisonFunc(parentPosition, targetPosition)) {
      closestParent = parent;
      targetPosition = parentPosition;
    }
  });
  return closestParent;
}, "findClosestParent");
var findClosestParentBT = /* @__PURE__ */ __name((parents) => {
  let closestParent = "";
  let maxPosition = Infinity;
  parents.forEach((parent) => {
    const parentPosition = commitPos.get(parent).y;
    if (parentPosition <= maxPosition) {
      closestParent = parent;
      maxPosition = parentPosition;
    }
  });
  return closestParent || void 0;
}, "findClosestParentBT");
var setParallelBTPos = /* @__PURE__ */ __name((sortedKeys, commits, defaultPos2) => {
  let curPos = defaultPos2;
  let maxPosition = defaultPos2;
  const roots = [];
  sortedKeys.forEach((key) => {
    const commit2 = commits.get(key);
    if (!commit2) {
      throw new Error(`Commit not found for key ${key}`);
    }
    if (commit2.parents.length) {
      curPos = calculateCommitPosition(commit2);
      maxPosition = Math.max(curPos, maxPosition);
    } else {
      roots.push(commit2);
    }
    setCommitPosition(commit2, curPos);
  });
  curPos = maxPosition;
  roots.forEach((commit2) => {
    setRootPosition(commit2, curPos, defaultPos2);
  });
  sortedKeys.forEach((key) => {
    const commit2 = commits.get(key);
    if (commit2 == null ? void 0 : commit2.parents.length) {
      const closestParent = findClosestParentBT(commit2.parents);
      curPos = commitPos.get(closestParent).y - COMMIT_STEP;
      if (curPos <= maxPosition) {
        maxPosition = curPos;
      }
      const x = branchPos.get(commit2.branch).pos;
      const y = curPos - LAYOUT_OFFSET;
      commitPos.set(commit2.id, { x, y });
    }
  });
}, "setParallelBTPos");
var findClosestParentPos = /* @__PURE__ */ __name((commit2) => {
  var _a;
  const closestParent = findClosestParent(commit2.parents.filter((p) => p !== null));
  if (!closestParent) {
    throw new Error(`Closest parent not found for commit ${commit2.id}`);
  }
  const closestParentPos = (_a = commitPos.get(closestParent)) == null ? void 0 : _a.y;
  if (closestParentPos === void 0) {
    throw new Error(`Closest parent position not found for commit ${commit2.id}`);
  }
  return closestParentPos;
}, "findClosestParentPos");
var calculateCommitPosition = /* @__PURE__ */ __name((commit2) => {
  const closestParentPos = findClosestParentPos(commit2);
  return closestParentPos + COMMIT_STEP;
}, "calculateCommitPosition");
var setCommitPosition = /* @__PURE__ */ __name((commit2, curPos) => {
  const branch2 = branchPos.get(commit2.branch);
  if (!branch2) {
    throw new Error(`Branch not found for commit ${commit2.id}`);
  }
  const x = branch2.pos;
  const y = curPos + LAYOUT_OFFSET;
  commitPos.set(commit2.id, { x, y });
  return { x, y };
}, "setCommitPosition");
var setRootPosition = /* @__PURE__ */ __name((commit2, curPos, defaultPos2) => {
  const branch2 = branchPos.get(commit2.branch);
  if (!branch2) {
    throw new Error(`Branch not found for commit ${commit2.id}`);
  }
  const y = curPos + defaultPos2;
  const x = branch2.pos;
  commitPos.set(commit2.id, { x, y });
}, "setRootPosition");
var drawCommitBullet = /* @__PURE__ */ __name((gBullets, commit2, commitPosition, typeClass, branchIndex, commitSymbolType) => {
  if (commitSymbolType === commitType.HIGHLIGHT) {
    gBullets.append("rect").attr("x", commitPosition.x - 10).attr("y", commitPosition.y - 10).attr("width", 20).attr("height", 20).attr(
      "class",
      `commit ${commit2.id} commit-highlight${branchIndex % THEME_COLOR_LIMIT} ${typeClass}-outer`
    );
    gBullets.append("rect").attr("x", commitPosition.x - 6).attr("y", commitPosition.y - 6).attr("width", 12).attr("height", 12).attr(
      "class",
      `commit ${commit2.id} commit${branchIndex % THEME_COLOR_LIMIT} ${typeClass}-inner`
    );
  } else if (commitSymbolType === commitType.CHERRY_PICK) {
    gBullets.append("circle").attr("cx", commitPosition.x).attr("cy", commitPosition.y).attr("r", 10).attr("class", `commit ${commit2.id} ${typeClass}`);
    gBullets.append("circle").attr("cx", commitPosition.x - 3).attr("cy", commitPosition.y + 2).attr("r", 2.75).attr("fill", "#fff").attr("class", `commit ${commit2.id} ${typeClass}`);
    gBullets.append("circle").attr("cx", commitPosition.x + 3).attr("cy", commitPosition.y + 2).attr("r", 2.75).attr("fill", "#fff").attr("class", `commit ${commit2.id} ${typeClass}`);
    gBullets.append("line").attr("x1", commitPosition.x + 3).attr("y1", commitPosition.y + 1).attr("x2", commitPosition.x).attr("y2", commitPosition.y - 5).attr("stroke", "#fff").attr("class", `commit ${commit2.id} ${typeClass}`);
    gBullets.append("line").attr("x1", commitPosition.x - 3).attr("y1", commitPosition.y + 1).attr("x2", commitPosition.x).attr("y2", commitPosition.y - 5).attr("stroke", "#fff").attr("class", `commit ${commit2.id} ${typeClass}`);
  } else {
    const circle = gBullets.append("circle");
    circle.attr("cx", commitPosition.x);
    circle.attr("cy", commitPosition.y);
    circle.attr("r", commit2.type === commitType.MERGE ? 9 : 10);
    circle.attr("class", `commit ${commit2.id} commit${branchIndex % THEME_COLOR_LIMIT}`);
    if (commitSymbolType === commitType.MERGE) {
      const circle2 = gBullets.append("circle");
      circle2.attr("cx", commitPosition.x);
      circle2.attr("cy", commitPosition.y);
      circle2.attr("r", 6);
      circle2.attr(
        "class",
        `commit ${typeClass} ${commit2.id} commit${branchIndex % THEME_COLOR_LIMIT}`
      );
    }
    if (commitSymbolType === commitType.REVERSE) {
      const cross = gBullets.append("path");
      cross.attr(
        "d",
        `M ${commitPosition.x - 5},${commitPosition.y - 5}L${commitPosition.x + 5},${commitPosition.y + 5}M${commitPosition.x - 5},${commitPosition.y + 5}L${commitPosition.x + 5},${commitPosition.y - 5}`
      ).attr("class", `commit ${typeClass} ${commit2.id} commit${branchIndex % THEME_COLOR_LIMIT}`);
    }
  }
}, "drawCommitBullet");
var drawCommitLabel = /* @__PURE__ */ __name((gLabels, commit2, commitPosition, pos) => {
  var _a;
  if (commit2.type !== commitType.CHERRY_PICK && (commit2.customId && commit2.type === commitType.MERGE || commit2.type !== commitType.MERGE) && (DEFAULT_GITGRAPH_CONFIG2 == null ? void 0 : DEFAULT_GITGRAPH_CONFIG2.showCommitLabel)) {
    const wrapper = gLabels.append("g");
    const labelBkg = wrapper.insert("rect").attr("class", "commit-label-bkg");
    const text = wrapper.append("text").attr("x", pos).attr("y", commitPosition.y + 25).attr("class", "commit-label").text(commit2.id);
    const bbox = (_a = text.node()) == null ? void 0 : _a.getBBox();
    if (bbox) {
      labelBkg.attr("x", commitPosition.posWithOffset - bbox.width / 2 - PY).attr("y", commitPosition.y + 13.5).attr("width", bbox.width + 2 * PY).attr("height", bbox.height + 2 * PY);
      if (dir === "TB" || dir === "BT") {
        labelBkg.attr("x", commitPosition.x - (bbox.width + 4 * PX + 5)).attr("y", commitPosition.y - 12);
        text.attr("x", commitPosition.x - (bbox.width + 4 * PX)).attr("y", commitPosition.y + bbox.height - 12);
      } else {
        text.attr("x", commitPosition.posWithOffset - bbox.width / 2);
      }
      if (DEFAULT_GITGRAPH_CONFIG2.rotateCommitLabel) {
        if (dir === "TB" || dir === "BT") {
          text.attr(
            "transform",
            "rotate(-45, " + commitPosition.x + ", " + commitPosition.y + ")"
          );
          labelBkg.attr(
            "transform",
            "rotate(-45, " + commitPosition.x + ", " + commitPosition.y + ")"
          );
        } else {
          const r_x = -7.5 - (bbox.width + 10) / 25 * 9.5;
          const r_y = 10 + bbox.width / 25 * 8.5;
          wrapper.attr(
            "transform",
            "translate(" + r_x + ", " + r_y + ") rotate(-45, " + pos + ", " + commitPosition.y + ")"
          );
        }
      }
    }
  }
}, "drawCommitLabel");
var drawCommitTags = /* @__PURE__ */ __name((gLabels, commit2, commitPosition, pos) => {
  var _a;
  if (commit2.tags.length > 0) {
    let yOffset = 0;
    let maxTagBboxWidth = 0;
    let maxTagBboxHeight = 0;
    const tagElements = [];
    for (const tagValue of commit2.tags.reverse()) {
      const rect = gLabels.insert("polygon");
      const hole = gLabels.append("circle");
      const tag = gLabels.append("text").attr("y", commitPosition.y - 16 - yOffset).attr("class", "tag-label").text(tagValue);
      const tagBbox = (_a = tag.node()) == null ? void 0 : _a.getBBox();
      if (!tagBbox) {
        throw new Error("Tag bbox not found");
      }
      maxTagBboxWidth = Math.max(maxTagBboxWidth, tagBbox.width);
      maxTagBboxHeight = Math.max(maxTagBboxHeight, tagBbox.height);
      tag.attr("x", commitPosition.posWithOffset - tagBbox.width / 2);
      tagElements.push({
        tag,
        hole,
        rect,
        yOffset
      });
      yOffset += 20;
    }
    for (const { tag, hole, rect, yOffset: yOffset2 } of tagElements) {
      const h2 = maxTagBboxHeight / 2;
      const ly = commitPosition.y - 19.2 - yOffset2;
      rect.attr("class", "tag-label-bkg").attr(
        "points",
        `
      ${pos - maxTagBboxWidth / 2 - PX / 2},${ly + PY}  
      ${pos - maxTagBboxWidth / 2 - PX / 2},${ly - PY}
      ${commitPosition.posWithOffset - maxTagBboxWidth / 2 - PX},${ly - h2 - PY}
      ${commitPosition.posWithOffset + maxTagBboxWidth / 2 + PX},${ly - h2 - PY}
      ${commitPosition.posWithOffset + maxTagBboxWidth / 2 + PX},${ly + h2 + PY}
      ${commitPosition.posWithOffset - maxTagBboxWidth / 2 - PX},${ly + h2 + PY}`
      );
      hole.attr("cy", ly).attr("cx", pos - maxTagBboxWidth / 2 + PX / 2).attr("r", 1.5).attr("class", "tag-hole");
      if (dir === "TB" || dir === "BT") {
        const yOrigin = pos + yOffset2;
        rect.attr("class", "tag-label-bkg").attr(
          "points",
          `
        ${commitPosition.x},${yOrigin + 2}
        ${commitPosition.x},${yOrigin - 2}
        ${commitPosition.x + LAYOUT_OFFSET},${yOrigin - h2 - 2}
        ${commitPosition.x + LAYOUT_OFFSET + maxTagBboxWidth + 4},${yOrigin - h2 - 2}
        ${commitPosition.x + LAYOUT_OFFSET + maxTagBboxWidth + 4},${yOrigin + h2 + 2}
        ${commitPosition.x + LAYOUT_OFFSET},${yOrigin + h2 + 2}`
        ).attr("transform", "translate(12,12) rotate(45, " + commitPosition.x + "," + pos + ")");
        hole.attr("cx", commitPosition.x + PX / 2).attr("cy", yOrigin).attr("transform", "translate(12,12) rotate(45, " + commitPosition.x + "," + pos + ")");
        tag.attr("x", commitPosition.x + 5).attr("y", yOrigin + 3).attr("transform", "translate(14,14) rotate(45, " + commitPosition.x + "," + pos + ")");
      }
    }
  }
}, "drawCommitTags");
var getCommitClassType = /* @__PURE__ */ __name((commit2) => {
  const commitSymbolType = commit2.customType ?? commit2.type;
  switch (commitSymbolType) {
    case commitType.NORMAL:
      return "commit-normal";
    case commitType.REVERSE:
      return "commit-reverse";
    case commitType.HIGHLIGHT:
      return "commit-highlight";
    case commitType.MERGE:
      return "commit-merge";
    case commitType.CHERRY_PICK:
      return "commit-cherry-pick";
    default:
      return "commit-normal";
  }
}, "getCommitClassType");
var calculatePosition = /* @__PURE__ */ __name((commit2, dir2, pos, commitPos2) => {
  const defaultCommitPosition = { x: 0, y: 0 };
  if (commit2.parents.length > 0) {
    const closestParent = findClosestParent(commit2.parents);
    if (closestParent) {
      const parentPosition = commitPos2.get(closestParent) ?? defaultCommitPosition;
      if (dir2 === "TB") {
        return parentPosition.y + COMMIT_STEP;
      } else if (dir2 === "BT") {
        const currentPosition = commitPos2.get(commit2.id) ?? defaultCommitPosition;
        return currentPosition.y - COMMIT_STEP;
      } else {
        return parentPosition.x + COMMIT_STEP;
      }
    }
  } else {
    if (dir2 === "TB") {
      return defaultPos;
    } else if (dir2 === "BT") {
      const currentPosition = commitPos2.get(commit2.id) ?? defaultCommitPosition;
      return currentPosition.y - COMMIT_STEP;
    } else {
      return 0;
    }
  }
  return 0;
}, "calculatePosition");
var getCommitPosition = /* @__PURE__ */ __name((commit2, pos, isParallelCommits) => {
  var _a, _b;
  const posWithOffset = dir === "BT" && isParallelCommits ? pos : pos + LAYOUT_OFFSET;
  const y = dir === "TB" || dir === "BT" ? posWithOffset : (_a = branchPos.get(commit2.branch)) == null ? void 0 : _a.pos;
  const x = dir === "TB" || dir === "BT" ? (_b = branchPos.get(commit2.branch)) == null ? void 0 : _b.pos : posWithOffset;
  if (x === void 0 || y === void 0) {
    throw new Error(`Position were undefined for commit ${commit2.id}`);
  }
  return { x, y, posWithOffset };
}, "getCommitPosition");
var drawCommits = /* @__PURE__ */ __name((svg, commits, modifyGraph) => {
  if (!DEFAULT_GITGRAPH_CONFIG2) {
    throw new Error("GitGraph config not found");
  }
  const gBullets = svg.append("g").attr("class", "commit-bullets");
  const gLabels = svg.append("g").attr("class", "commit-labels");
  let pos = dir === "TB" || dir === "BT" ? defaultPos : 0;
  const keys = [...commits.keys()];
  const isParallelCommits = (DEFAULT_GITGRAPH_CONFIG2 == null ? void 0 : DEFAULT_GITGRAPH_CONFIG2.parallelCommits) ?? false;
  const sortKeys = /* @__PURE__ */ __name((a, b) => {
    var _a, _b;
    const seqA = (_a = commits.get(a)) == null ? void 0 : _a.seq;
    const seqB = (_b = commits.get(b)) == null ? void 0 : _b.seq;
    return seqA !== void 0 && seqB !== void 0 ? seqA - seqB : 0;
  }, "sortKeys");
  let sortedKeys = keys.sort(sortKeys);
  if (dir === "BT") {
    if (isParallelCommits) {
      setParallelBTPos(sortedKeys, commits, pos);
    }
    sortedKeys = sortedKeys.reverse();
  }
  sortedKeys.forEach((key) => {
    var _a;
    const commit2 = commits.get(key);
    if (!commit2) {
      throw new Error(`Commit not found for key ${key}`);
    }
    if (isParallelCommits) {
      pos = calculatePosition(commit2, dir, pos, commitPos);
    }
    const commitPosition = getCommitPosition(commit2, pos, isParallelCommits);
    if (modifyGraph) {
      const typeClass = getCommitClassType(commit2);
      const commitSymbolType = commit2.customType ?? commit2.type;
      const branchIndex = ((_a = branchPos.get(commit2.branch)) == null ? void 0 : _a.index) ?? 0;
      drawCommitBullet(gBullets, commit2, commitPosition, typeClass, branchIndex, commitSymbolType);
      drawCommitLabel(gLabels, commit2, commitPosition, pos);
      drawCommitTags(gLabels, commit2, commitPosition, pos);
    }
    if (dir === "TB" || dir === "BT") {
      commitPos.set(commit2.id, { x: commitPosition.x, y: commitPosition.posWithOffset });
    } else {
      commitPos.set(commit2.id, { x: commitPosition.posWithOffset, y: commitPosition.y });
    }
    pos = dir === "BT" && isParallelCommits ? pos + COMMIT_STEP : pos + COMMIT_STEP + LAYOUT_OFFSET;
    if (pos > maxPos) {
      maxPos = pos;
    }
  });
}, "drawCommits");
var shouldRerouteArrow = /* @__PURE__ */ __name((commitA, commitB, p1, p2, allCommits) => {
  const commitBIsFurthest = dir === "TB" || dir === "BT" ? p1.x < p2.x : p1.y < p2.y;
  const branchToGetCurve = commitBIsFurthest ? commitB.branch : commitA.branch;
  const isOnBranchToGetCurve = /* @__PURE__ */ __name((x) => x.branch === branchToGetCurve, "isOnBranchToGetCurve");
  const isBetweenCommits = /* @__PURE__ */ __name((x) => x.seq > commitA.seq && x.seq < commitB.seq, "isBetweenCommits");
  return [...allCommits.values()].some((commitX) => {
    return isBetweenCommits(commitX) && isOnBranchToGetCurve(commitX);
  });
}, "shouldRerouteArrow");
var findLane = /* @__PURE__ */ __name((y1, y2, depth = 0) => {
  const candidate = y1 + Math.abs(y1 - y2) / 2;
  if (depth > 5) {
    return candidate;
  }
  const ok = lanes.every((lane) => Math.abs(lane - candidate) >= 10);
  if (ok) {
    lanes.push(candidate);
    return candidate;
  }
  const diff = Math.abs(y1 - y2);
  return findLane(y1, y2 - diff / 5, depth + 1);
}, "findLane");
var drawArrow = /* @__PURE__ */ __name((svg, commitA, commitB, allCommits) => {
  var _a, _b, _c, _d, _e;
  const p1 = commitPos.get(commitA.id);
  const p2 = commitPos.get(commitB.id);
  if (p1 === void 0 || p2 === void 0) {
    throw new Error(`Commit positions not found for commits ${commitA.id} and ${commitB.id}`);
  }
  const arrowNeedsRerouting = shouldRerouteArrow(commitA, commitB, p1, p2, allCommits);
  let arc = "";
  let arc2 = "";
  let radius = 0;
  let offset = 0;
  let colorClassNum = (_a = branchPos.get(commitB.branch)) == null ? void 0 : _a.index;
  if (commitB.type === commitType.MERGE && commitA.id !== commitB.parents[0]) {
    colorClassNum = (_b = branchPos.get(commitA.branch)) == null ? void 0 : _b.index;
  }
  let lineDef;
  if (arrowNeedsRerouting) {
    arc = "A 10 10, 0, 0, 0,";
    arc2 = "A 10 10, 0, 0, 1,";
    radius = 10;
    offset = 10;
    const lineY = p1.y < p2.y ? findLane(p1.y, p2.y) : findLane(p2.y, p1.y);
    const lineX = p1.x < p2.x ? findLane(p1.x, p2.x) : findLane(p2.x, p1.x);
    if (dir === "TB") {
      if (p1.x < p2.x) {
        lineDef = `M ${p1.x} ${p1.y} L ${lineX - radius} ${p1.y} ${arc2} ${lineX} ${p1.y + offset} L ${lineX} ${p2.y - radius} ${arc} ${lineX + offset} ${p2.y} L ${p2.x} ${p2.y}`;
      } else {
        colorClassNum = (_c = branchPos.get(commitA.branch)) == null ? void 0 : _c.index;
        lineDef = `M ${p1.x} ${p1.y} L ${lineX + radius} ${p1.y} ${arc} ${lineX} ${p1.y + offset} L ${lineX} ${p2.y - radius} ${arc2} ${lineX - offset} ${p2.y} L ${p2.x} ${p2.y}`;
      }
    } else if (dir === "BT") {
      if (p1.x < p2.x) {
        lineDef = `M ${p1.x} ${p1.y} L ${lineX - radius} ${p1.y} ${arc} ${lineX} ${p1.y - offset} L ${lineX} ${p2.y + radius} ${arc2} ${lineX + offset} ${p2.y} L ${p2.x} ${p2.y}`;
      } else {
        colorClassNum = (_d = branchPos.get(commitA.branch)) == null ? void 0 : _d.index;
        lineDef = `M ${p1.x} ${p1.y} L ${lineX + radius} ${p1.y} ${arc2} ${lineX} ${p1.y - offset} L ${lineX} ${p2.y + radius} ${arc} ${lineX - offset} ${p2.y} L ${p2.x} ${p2.y}`;
      }
    } else {
      if (p1.y < p2.y) {
        lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${lineY - radius} ${arc} ${p1.x + offset} ${lineY} L ${p2.x - radius} ${lineY} ${arc2} ${p2.x} ${lineY + offset} L ${p2.x} ${p2.y}`;
      } else {
        colorClassNum = (_e = branchPos.get(commitA.branch)) == null ? void 0 : _e.index;
        lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${lineY + radius} ${arc2} ${p1.x + offset} ${lineY} L ${p2.x - radius} ${lineY} ${arc} ${p2.x} ${lineY - offset} L ${p2.x} ${p2.y}`;
      }
    }
  } else {
    arc = "A 20 20, 0, 0, 0,";
    arc2 = "A 20 20, 0, 0, 1,";
    radius = 20;
    offset = 20;
    if (dir === "TB") {
      if (p1.x < p2.x) {
        if (commitB.type === commitType.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y - radius} ${arc} ${p1.x + offset} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc2} ${p2.x} ${p1.y + offset} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.x > p2.x) {
        arc = "A 20 20, 0, 0, 0,";
        arc2 = "A 20 20, 0, 0, 1,";
        radius = 20;
        offset = 20;
        if (commitB.type === commitType.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y - radius} ${arc2} ${p1.x - offset} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x + radius} ${p1.y} ${arc} ${p2.x} ${p1.y + offset} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.x === p2.x) {
        lineDef = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      }
    } else if (dir === "BT") {
      if (p1.x < p2.x) {
        if (commitB.type === commitType.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y + radius} ${arc2} ${p1.x + offset} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc} ${p2.x} ${p1.y - offset} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.x > p2.x) {
        arc = "A 20 20, 0, 0, 0,";
        arc2 = "A 20 20, 0, 0, 1,";
        radius = 20;
        offset = 20;
        if (commitB.type === commitType.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y + radius} ${arc} ${p1.x - offset} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc} ${p2.x} ${p1.y - offset} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.x === p2.x) {
        lineDef = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      }
    } else {
      if (p1.y < p2.y) {
        if (commitB.type === commitType.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc2} ${p2.x} ${p1.y + offset} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y - radius} ${arc} ${p1.x + offset} ${p2.y} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.y > p2.y) {
        if (commitB.type === commitType.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc} ${p2.x} ${p1.y - offset} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y + radius} ${arc2} ${p1.x + offset} ${p2.y} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.y === p2.y) {
        lineDef = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      }
    }
  }
  if (lineDef === void 0) {
    throw new Error("Line definition not found");
  }
  svg.append("path").attr("d", lineDef).attr("class", "arrow arrow" + colorClassNum % THEME_COLOR_LIMIT);
}, "drawArrow");
var drawArrows = /* @__PURE__ */ __name((svg, commits) => {
  const gArrows = svg.append("g").attr("class", "commit-arrows");
  [...commits.keys()].forEach((key) => {
    const commit2 = commits.get(key);
    if (commit2.parents && commit2.parents.length > 0) {
      commit2.parents.forEach((parent) => {
        drawArrow(gArrows, commits.get(parent), commit2, commits);
      });
    }
  });
}, "drawArrows");
var drawBranches = /* @__PURE__ */ __name((svg, branches) => {
  const g = svg.append("g");
  branches.forEach((branch2, index) => {
    var _a;
    const adjustIndexForTheme = index % THEME_COLOR_LIMIT;
    const pos = (_a = branchPos.get(branch2.name)) == null ? void 0 : _a.pos;
    if (pos === void 0) {
      throw new Error(`Position not found for branch ${branch2.name}`);
    }
    const line = g.append("line");
    line.attr("x1", 0);
    line.attr("y1", pos);
    line.attr("x2", maxPos);
    line.attr("y2", pos);
    line.attr("class", "branch branch" + adjustIndexForTheme);
    if (dir === "TB") {
      line.attr("y1", defaultPos);
      line.attr("x1", pos);
      line.attr("y2", maxPos);
      line.attr("x2", pos);
    } else if (dir === "BT") {
      line.attr("y1", maxPos);
      line.attr("x1", pos);
      line.attr("y2", defaultPos);
      line.attr("x2", pos);
    }
    lanes.push(pos);
    const name = branch2.name;
    const labelElement = drawText(name);
    const bkg = g.insert("rect");
    const branchLabel = g.insert("g").attr("class", "branchLabel");
    const label = branchLabel.insert("g").attr("class", "label branch-label" + adjustIndexForTheme);
    label.node().appendChild(labelElement);
    const bbox = labelElement.getBBox();
    bkg.attr("class", "branchLabelBkg label" + adjustIndexForTheme).attr("rx", 4).attr("ry", 4).attr("x", -bbox.width - 4 - ((DEFAULT_GITGRAPH_CONFIG2 == null ? void 0 : DEFAULT_GITGRAPH_CONFIG2.rotateCommitLabel) === true ? 30 : 0)).attr("y", -bbox.height / 2 + 8).attr("width", bbox.width + 18).attr("height", bbox.height + 4);
    label.attr(
      "transform",
      "translate(" + (-bbox.width - 14 - ((DEFAULT_GITGRAPH_CONFIG2 == null ? void 0 : DEFAULT_GITGRAPH_CONFIG2.rotateCommitLabel) === true ? 30 : 0)) + ", " + (pos - bbox.height / 2 - 1) + ")"
    );
    if (dir === "TB") {
      bkg.attr("x", pos - bbox.width / 2 - 10).attr("y", 0);
      label.attr("transform", "translate(" + (pos - bbox.width / 2 - 5) + ", 0)");
    } else if (dir === "BT") {
      bkg.attr("x", pos - bbox.width / 2 - 10).attr("y", maxPos);
      label.attr("transform", "translate(" + (pos - bbox.width / 2 - 5) + ", " + maxPos + ")");
    } else {
      bkg.attr("transform", "translate(-19, " + (pos - bbox.height / 2) + ")");
    }
  });
}, "drawBranches");
var setBranchPosition = /* @__PURE__ */ __name(function(name, pos, index, bbox, rotateCommitLabel) {
  branchPos.set(name, { pos, index });
  pos += 50 + (rotateCommitLabel ? 40 : 0) + (dir === "TB" || dir === "BT" ? bbox.width / 2 : 0);
  return pos;
}, "setBranchPosition");
var draw = /* @__PURE__ */ __name(function(txt, id, ver, diagObj) {
  clear3();
  log.debug("in gitgraph renderer", txt + "\n", "id:", id, ver);
  if (!DEFAULT_GITGRAPH_CONFIG2) {
    throw new Error("GitGraph config not found");
  }
  const rotateCommitLabel = DEFAULT_GITGRAPH_CONFIG2.rotateCommitLabel ?? false;
  const db2 = diagObj.db;
  allCommitsDict = db2.getCommits();
  const branches = db2.getBranchesAsObjArray();
  dir = db2.getDirection();
  const diagram2 = select(`[id="${id}"]`);
  let pos = 0;
  branches.forEach((branch2, index) => {
    var _a;
    const labelElement = drawText(branch2.name);
    const g = diagram2.append("g");
    const branchLabel = g.insert("g").attr("class", "branchLabel");
    const label = branchLabel.insert("g").attr("class", "label branch-label");
    (_a = label.node()) == null ? void 0 : _a.appendChild(labelElement);
    const bbox = labelElement.getBBox();
    pos = setBranchPosition(branch2.name, pos, index, bbox, rotateCommitLabel);
    label.remove();
    branchLabel.remove();
    g.remove();
  });
  drawCommits(diagram2, allCommitsDict, false);
  if (DEFAULT_GITGRAPH_CONFIG2.showBranches) {
    drawBranches(diagram2, branches);
  }
  drawArrows(diagram2, allCommitsDict);
  drawCommits(diagram2, allCommitsDict, true);
  utils_default.insertTitle(
    diagram2,
    "gitTitleText",
    DEFAULT_GITGRAPH_CONFIG2.titleTopMargin ?? 0,
    db2.getDiagramTitle()
  );
  setupGraphViewbox2(
    void 0,
    diagram2,
    DEFAULT_GITGRAPH_CONFIG2.diagramPadding,
    DEFAULT_GITGRAPH_CONFIG2.useMaxWidth
  );
}, "draw");
var gitGraphRenderer_default = {
  draw
};
var getStyles = /* @__PURE__ */ __name((options) => `
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(
  (i) => `
        .branch-label${i} { fill: ${options["gitBranchLabel" + i]}; }
        .commit${i} { stroke: ${options["git" + i]}; fill: ${options["git" + i]}; }
        .commit-highlight${i} { stroke: ${options["gitInv" + i]}; fill: ${options["gitInv" + i]}; }
        .label${i}  { fill: ${options["git" + i]}; }
        .arrow${i} { stroke: ${options["git" + i]}; }
        `
).join("\n")}

  .branch {
    stroke-width: 1;
    stroke: ${options.lineColor};
    stroke-dasharray: 2;
  }
  .commit-label { font-size: ${options.commitLabelFontSize}; fill: ${options.commitLabelColor};}
  .commit-label-bkg { font-size: ${options.commitLabelFontSize}; fill: ${options.commitLabelBackground}; opacity: 0.5; }
  .tag-label { font-size: ${options.tagLabelFontSize}; fill: ${options.tagLabelColor};}
  .tag-label-bkg { fill: ${options.tagLabelBackground}; stroke: ${options.tagLabelBorder}; }
  .tag-hole { fill: ${options.textColor}; }

  .commit-merge {
    stroke: ${options.primaryColor};
    fill: ${options.primaryColor};
  }
  .commit-reverse {
    stroke: ${options.primaryColor};
    fill: ${options.primaryColor};
    stroke-width: 3;
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${options.primaryColor};
    fill: ${options.primaryColor};
  }

  .arrow { stroke-width: 8; stroke-linecap: round; fill: none}
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${options.textColor};
  }
`, "getStyles");
var styles_default = getStyles;
var diagram = {
  parser,
  db,
  renderer: gitGraphRenderer_default,
  styles: styles_default
};
export {
  diagram
};
