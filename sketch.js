function setup() {
  let can = createCanvas(WIDTH, HEIGHT);
  can.parent('wrap');
  frameRate(30);
  g.addEdge('a', 'b', 2);
  g.addEdge('a', 'c', 2);
  g.addEdge('b', 'c', 2)
}

function draw() {
  background(220);

  g.applyRopes();
  g.applyCharges();
  g.step();

  let vertices = Object.keys(g.adj);
  for (var i = 0; i < vertices.length; i++) {
      for (var j = i + 1; j < vertices.length; j++) {
        let na = g.nodes[i];
        let nb = g.nodes[j];
        if (Object.keys(g.adj[na.name]).includes(nb.name)) {
          line(na.x, na.y, nb.x, nb.y);
          textAlign(RIGHT, TOP);
          text(g.adj[na.name][nb.name], (na.x + nb.x) / 2, (na.y + nb.y) / 2);
        }
      }
  }

  for (let node of g.nodes) {
    circle(node.x, node.y, SIZE);
    textAlign(CENTER, CENTER);
    text(node.name, node.x, node.y);
  }
}