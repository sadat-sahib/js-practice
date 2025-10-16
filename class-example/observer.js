class Observable {
  constructor(subscriber) {
    this.subscriber = subscriber;
  }
  
  subscribe(observer) {
    return this.subscriber(observer);
  }
  
  map(fn) {
    return new Observable(observer => {
      return this.subscribe({
        next: value => observer.next(fn(value)),
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
    });
  }
}

const source = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

const doubled = source.map(x => x * 2);
doubled.subscribe({
  next: value => console.log(value),
  complete: () => console.log('done')
});