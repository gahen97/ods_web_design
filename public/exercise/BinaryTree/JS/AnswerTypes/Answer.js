// Answer stuff that is used for every type ...
class Answer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

  sort (arr) {
    return arr.sort ((a,b)=>{
      return a.data - b.data;
    });
  }

  /* --- CHECK IF CORRECT --- */
  check (userAnswer) {
    // if not given an answer, is wrong.
    if (!userAnswer) return false;

    // if not enough / too many nodes in answer, is wrong.
    if (userAnswer.length !== this.data.length) return false;

    // every node must match ...
    // note that order doesn't matter here, so we sort
    if (!this.orderMatters){
      this.data  = this.sort (this.data);
      userAnswer = this.sort (userAnswer);
    }

    for (var i in this.data) {
      if (!userAnswer [i]) return false;
      if (this.data [i].data !== userAnswer [i].data) return false;
    }

    return true;
  }


  /* --- ANIMATIONS --- */
  // animate the path to some starting element
  animateTo (element, cb) {
    var path = control.pathTo (element.value);
    Animation.run ("Traverse", path, {
      callback: cb
    })
  }

  // animate traversal answer
  animate (elements, cb, each){
    // before we start: we should animate moving to the first element
    //this.animateTo (elements [0], ()=>{
      // now we can animate stepping through our results
      Animation.run ("Traverse", elements, {
        callback: cb,
        each: each
      });
    //});
  }

  /* --- MAIN DISPLAY ---- */
  display()      //TODO replace with production version
  {
    control.disable ();

    // TODO should be something better here maybe
    control.reset ();

    var elements = this.calculateAnswerElements();
    this.animate (elements,
      () => { // CALLBACK
        control.enable ();
      },
      (elem, index) => { // EACH
        if (!control.disabled) return;
        
        control.setActiveElement (elem);

        if (this.anim_each)
          this.anim_each (elem, index);
      }
    );
  }


  /* --- OVERRIDE ---- */
  get orderMatters(){ return true; }
  generate(){ return; }
  calculateAnswerElements() { return []; };
}
