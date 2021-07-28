class Node {
  constructor(name) {
    this.name = name;
    this.x = Math.random() * WIDTH;
    this.y = Math.random() * HEIGHT;
    this.vx = 0;
    this.vy = 0;
  }
}

class Graph {
  constructor() {
    this.adj = {};
    this.nodes = [];
  }

  addEdge(from, to, len) {
    if (!Object.keys(this.adj).includes(from)) {
      this.adj[from] = {};
      this.nodes.push(new Node(from));
    }

    if (!Object.keys(this.adj).includes(to)) {
      this.adj[to] = {};
      this.nodes.push(new Node(to));
    }

    this.adj[from][to] = len;
    this.adj[to][from] = len;
  }

  step() {
    for (let node of this.nodes) {
      node.x += node.vx;
      node.y += node.vy;

      node.vx = 0;
      node.vy = 0;
    }
  }

  //everything has a charge and repels
  applyCharges() {
    let vertices = Object.keys(this.adj);
    for (var i = 0; i < vertices.length; i++) {
      let na = this.nodes[i];
      for (var j = i + 1; j < vertices.length; j++) {
        let nb = this.nodes[j];
        let dx = na.x - nb.x;
        let dy = na.y - nb.y;

        na.vx += CHARGE * SPEED * 2 / (dx + 1);
        nb.vx -= CHARGE * SPEED * 2 / (dx + 1);
        na.vy += CHARGE * SPEED * 2 / (dy + 1);
        nb.vy -= CHARGE * SPEED * 2 / (dy + 1);
      }
    }
  }

  /*
  applyMouse(mx, my) {
    let vertices = Object.keys(this.adj);
    for (var i = 0; i < vertices.length; i++) {
      let na = this.nodes[i];
      let dmx = na.x - mx;
      let dmy = na.y - my;

      na.vx += SPEED * 10 / (dmx + 1);
      na.vy += SPEED * 10 / (dmy + 1);
    }
  }*/

  //connect nodes with length of rope
  applyRopes() {
    let vertices = Object.keys(this.adj);
    for (var i = 0; i < vertices.length; i++) {
      for (var j = i + 1; j < vertices.length; j++) {
        let na = this.nodes[i];
        let nb = this.nodes[j];
        if (Object.keys(this.adj[na.name]).includes(nb.name)) {
          let dx = na.x - nb.x;
          let dy = na.y - nb.y;
          let dist = Math.sqrt(dx * dx + dy * dy)
          let slack = dist - this.adj[na.name][nb.name] * TENSION;
          
          na.vx -= SPEED * slack / dist * dx;
          nb.vx += SPEED * slack / dist * dx;
          na.vy -= SPEED * slack / dist * dy;
          nb.vy += SPEED * slack / dist * dy;
        }
      }
    }
  }
}