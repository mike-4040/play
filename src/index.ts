class Node {
  constructor(
    public data: number,
    public left: Node | null = null,
    public right: Node | null = null
  ) {}
}

class BSTree {
  root: Node | null = null;

  insert(data?: number): boolean {
    if (data === undefined) {
      return false;
    }
    const node = new Node(data);
    if (!this.root) {
      this.root = node;
      return true;
    }

    let current = this.root;
    while (true) {
      if (data === current.data) {
        return false;
      }

      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          return true;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return true;
        }
        current = current.right;
      }
    }
  }

  find(data: number) {
    if (!this.root) {
      return false;
    }

    let current: Node | null = this.root;
    while (current) {
      console.dir({ current }, { depth: null });
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  static traversePreOrder(node: Node | null) {
    if (!node) {
      return;
    }
    console.log(node.data);
    BSTree.traversePreOrder(node.left);
    BSTree.traversePreOrder(node.right);
  }

  static traverseInOrder(node: Node | null) {
    if (!node) {
      return;
    }
    BSTree.traverseInOrder(node.left);
    console.log(node.data);
    BSTree.traverseInOrder(node.right);
  }
  static traversePostOrder(node: Node | null) {
    if (!node) {
      return;
    }
    BSTree.traversePostOrder(node.left);
    BSTree.traversePostOrder(node.right);
    console.log(node.data);
  }

  static height(node: Node | null): number {
    if (!node) {
      return -1;
    }
    if (!node.left && !node.right) {
      return 0;
    }
    return Math.max(BSTree.height(node.left), BSTree.height(node.right)) + 1;
  }

  min() {
    return this._min(this.root);
  }

  private _min(node: Node | null): number {
    if (!node) {
      return Infinity;
    }
    return Math.min(node.data, this._min(node.left));
  }

  equals(other: BSTree) {
    return this._equals(this.root, other.root);
  }

  private _equals(node1: Node | null, node2: Node | null): boolean {
    if (!node1 && !node2) {
      return true;
    }
    if (!node1 || !node2) {
      return false;
    }
    return (
      node1.data === node2.data &&
      this._equals(node1.left, node2.left) &&
      this._equals(node1.right, node2.right)
    );
  }
}

const bst = new BSTree();
bst.insert(7);
bst.insert(4);
bst.insert(-99);
bst.insert(9);
bst.insert(6);
bst.insert(8);
bst.insert(10);
bst.insert(-100);
bst.insert(-Infinity);
bst.insert(-Infinity);
bst.insert(5);
console.dir(bst, { depth: null });
console.log(bst.find(10));
console.log('pre order');
BSTree.traversePreOrder(bst.root);
console.log('in order');
BSTree.traverseInOrder(bst.root);

console.log('post order');
BSTree.traversePostOrder(bst.root);

console.log('height', BSTree.height(bst.root));

console.log('min', bst.min());

const bst2 = new BSTree();
bst2.insert(7);
bst2.insert(4);
bst2.insert(-99);
bst2.insert(9);
bst2.insert(6);
bst2.insert(8);
bst2.insert(11);
bst2.insert(-100);
bst2.insert(-Infinity );
bst2.insert(5);

console.log('equals', bst.equals(bst2));
