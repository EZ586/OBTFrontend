/**
 * Abstract Class GraphNode.
 *
 * @class GraphNode
 */
class GraphNode {
  constructor() {
    if (new.target.name === GraphNode.name) {
      throw new Error("Cannot create an instance of abstract class");
    }
    this.childNodes = [];
  }
}

class CommentNode extends GraphNode {
  constructor(comment) {
    super();
    this.comment = comment;
  }
}

class ClusterNode extends GraphNode {
  constructor(clusterText) {
    super();
    this.clusterText = clusterText;
  }
}

module.exports = { GraphNode, CommentNode, ClusterNode };
