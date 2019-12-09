function* list() {
  for (let index = 0; index < 10; index++) {
    yield index;
  }
}

var output = list();
// copy test to console
// output.next()
