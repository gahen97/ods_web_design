/*
  Everything for dealing with Element in the DOM

  I've got the devil on my shoulder. Over and over.
  And I just can't sink any lower. Lower and lower.
  The hounds of hell are getting closer. Closer and closer.
  I've got the devil on my shoulder. Over and over.
  Oh!

  Follow that rainbow, my lucky old man.
  There ain't no pot of gold - just kappa tokens.
  I found the key to life - the lock was broken.
  All my accomplishments are best left unspoken!

  I've dug a hole so deep, I'm gonna drown in my mistakes.
  Can't even sell my soul 'cause it ain't worth shit to take.
*/

class ElemGraphics {
  constructor(elem){
    this.element = elem;
  }

  draw () {
    // TODO HARDCODING IS BAD. MAYBE MOVE SELECTORS TO DEFS?
    var elementDiv = $(ELEMENT_TEMPLATE).clone ();
    var model      = $(MODEL_DISPLAY);
    var span       = $("span", elementDiv);

    // set the text ...
    span.text (this.element.value).data ("id", this.element.id); // TODO There's gotta be a better way to do this.element

    // parent it to the main div, add the stuff, return
    elementDiv.insertAfter (model).data ("id", this.element.id);

    this.element.addControls (elementDiv);

    return elementDiv;
  }
}
