/*
  This is a static class that basically takes a series of elements
    (note these must all be Element objects)
    and traverses through the list.
*/

class NodeTraversalAnimation {
  static computeSlope (from, to) {
    var p1 = Div.dimensionsOf (from);
    var p2 = Div.dimensionsOf (to);

    var x1 = p1.xP;
    var y1 = p1.yP;
    var x2 = p2.xP + p2.width / 2;
    var y2 = p2.yP + p2.height / 2;

    return {
      rise: (y2 - y1),
      run: (x2 - x1),
      startPos: {
        left: p1.xP,
        top:  p1.yP
      }
    }
  }

  static animateFromTo (div, eF, eT, opts) {
    if (!opts) opts = this.defaultOpts;

    var f1 = Div.dimensionsOf (eF);
    var f2 = Div.dimensionsOf (eT);

    var ep;
    if (f1.xP > f2.xP)
      ep = eF.leftEndpoint.canvas;
    else
      ep = eF.rightEndpoint.canvas;

    ep = $(ep);

    var slope = this.computeSlope (ep, eT);

    slope.rise = slope.rise / opts.numIterations;
    slope.run  = slope.run  / opts.numIterations;

    var curPos = slope.startPos;

    var iter = (i, cb) => {
      if (i > opts.numIterations)
        cb();
      else{
        div.offset(curPos);
        curPos.top  += slope.rise;
        curPos.left += slope.run;

        setTimeout (iter, 50, i+1, cb);
      }
    }

    iter(0, ()=>{
      opts.callback ();
    });
  }

  static runAnimation (elements, cb, eachFunc) {
    // TODO
    var d = $("<div id='animationDiv'></div>").appendTo ($ (QUESTION_MAIN));

    var step = (i) => {
      if (i >= elements.length){
        d.remove ();
        cb ();
      }else{
        this.animateFromTo (d, elements [i - 1], elements [i], {
          numIterations: 10,
          callback: ()=>{
            eachFunc (elements[i]);
            step(i+1);
          }
        });
      }
    }

    eachFunc (elements [0])
    step (1);
  }
}

NodeTraversalAnimation.defaultOpts = {
  callback: function(){ },
  numIterations: 10
}
