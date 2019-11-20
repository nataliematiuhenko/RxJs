import { Observable, of, from, fromEvent } from 'rxjs'; 
import { map, mapTo, filter, scan, delay, tap, combineLatest } from 'rxjs/operators';


// ******* exercise 1 *******
// console.clear();
{
  const data = ['a', 'g', 'o', 'f', '3', '5', 'r', 'D', 'n', 'b', 's', 'c'];
  const source$ = from(data);

  const letters = source$.pipe( 
                          filter( letter => {
                            const regex = /[a-g]/i;
                            return letter.match(regex);
                          } 
                          ));

const result = letters.subscribe(result => console.log(result));

//   // TODO: Filter only from a-gA-G
//   // source$.pipe().subscribe(
//   //   result => console.log(result)
//   // )
}

// ******* exercise 2 *******
// console.clear();
{
  const data = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
  const source$ = from(data);

  const numbers = source$.pipe(
    filter( nums => {
      const regexp = /\d+/;
      return nums.match(regexp);
    }),
    scan((accum, item)=> +accum + +item, 0)
  );
  
  var result = numbers.subscribe(
      (res) => console.log(res)
      );

  // TODO: Create a var `result` that contains the sum
  // of all numbers in source.
  // Use pure functions
  // such as map, filter, reduce, scan, merge, delay, 
  // concat, take, etc.

  // source$.pipe().subscribe(
  //   result => console.log(result)
  // )
}

// ******* exercise 3 *******
// console.clear();
{
  
  let observable$ = Observable.create(o => o.next(123));
  let newObs = observable$.pipe(
    tap(() => console.log('promise started')),
    delay(1000),
    tap(() => console.log('timeout')),
  );

  const result = newObs.subscribe((x) => console.log( 'next: '+ x))


  // const promise = new Promise(function (resolve, reject) {
  //   setTimeout(function () {
  //     console.log('timeout');
  //     resolve(123);
  //   }, 1000);
  //   console.log('promise started');
  // }); 

  // promise.then(x => console.log('resolved: ' + x));

  // TODO: Create an RxJS Observable `observable` with 
  // the same behavior as the promise above.
  // observable$ =

  // observable$.subscribe(x => console.log('next: ' + x));
}

// // ******* exercise 4 *******
// console.clear();
{
  const heightEl = document.getElementById('height')
  const widthEl = document.getElementById('width')

  const height$ = fromEvent(heightEl, 'input').pipe(
    map(event => event.target.value)
  )
  const width$ = fromEvent(widthEl, 'input').pipe(
    map(event => event.target.value)
  )

  const area = height$.pipe(

    combineLatest(width$, (w, h) =>  w * h ));
  area.subscribe( x => console.log('Such squares area equals ' + x));


//   // const heightEl = document.getElementById('height')
//   // const widthEl = document.getElementById('width')
//   // fromEvent(heightEl, 'input')
//   // fromEvent(widthEl, 'input')
//   // TODO: Create observable that calculates area of square using observables
//   // above
}
