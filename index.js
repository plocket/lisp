
const create_syntax_tree = function ( raw ) {
  /** Given a string that represents lisp code, create a syntax tree.
  * 
  * Examples
  * "(first (list 1 (+ 2 3) 9))"
  * "()"?
  */
  console.log( 2, raw );
  // Make sure all parens have spaces around them so splitting will work properly
  raw = raw.replace( /\(/g, `( ` );
  raw = raw.replace( /\)/g, ` )` );

  // // Clean up extra spaces in the string
  // // Not sure how to make this work with strings. Will assume very specific
  // // format for now.
  // raw = raw.replace( /\s+/g, ` ` );

  // Get all atoms and parens
  let all_strs = raw.split( /\s/ );
  let result = accumulate_atoms( [], all_strs );
  console.log( result );
  return result[0];
};  // Ends create_syntax_tree()

const accumulate_atoms = function ( curr_list, str_list ) {

  console.log( 3, str_list );

  // Enter the list
  for ( let str_i = 0; str_i < str_list.length; str_i++ ) {
    let str = str_list[ str_i ];
    console.log( `pos:`, str_i, str );

    if ( str === `)` ) {
      console.log( 3.1 );
      // Return the curr_list as it is
      break;

    } else if ( str === `(` ) {
      console.log( 3.2 );

      // Start a new nested list
      // TODO: how to skip those added items after the next list is returned?
      let nested_list = [];
      let remaining_strs = str_list.slice( str_i + 1 );
      console.log( "remaining strs", str_list.slice( str_i + 1 ) );
      curr_list.push( nested_list );
      accumulate_atoms( nested_list, remaining_strs );

      console.log( `nested_list`, nested_list.length, nested_list );
      // Somehow skip the items that have already been handled, including
      // the ones in nested lists

      console.log( "curr_list after adding", curr_list );
      let handled_strs = curr_list.reduce(function (count, current) {
        return count + current.length
      }, 0);

      console.log( `handled_strs`, handled_strs );

      // Change our position in the current list while looping. This
      // is risky. I haven't done it before
      str_i += handled_strs - 1;

      console.log( "modified next index", str_i + 1, str_list[ str_i + 1 ], str_list.slice( str_i + 1 ) );

    } else {
      console.log( 3.3 );
      // If it's not a paren, add the plain value to this nested list
      let val = str;
      // Make sure to turn a string representing a number into a number
      // Does not account for '' or ' '
      // Does not differentiate between floats and ints
      if ( !isNaN(str) ) { val = Number( str ); }
      curr_list.push( val );
    }
  }

  console.log( 4, curr_list );
  return curr_list;
};  // Ends accumulate_atoms()


let str = "(first (list 1 (+ 2 3) 9))";
let syntax_tree = create_syntax_tree( str );
console.log( syntax_tree );
