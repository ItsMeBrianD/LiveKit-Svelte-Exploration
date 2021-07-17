export function srcObject(node: HTMLMediaElement, stream: MediaStream) {
    node.srcObject = stream;
    node.play()
    // node.volume = 0;
    return {
      update(newStream) {
        if (node.srcObject != newStream) {
          node.srcObject = newStream
          node.play()
        }
      }
    }
  }