var NEXT_ID = 0;
function Pointer (pointer, opts, type){
	pointer.attr("id", "pointer" + NEXT_ID++);

	this.elem = pointer;
	if (opts.hasEndpoint !== false)
		this.plumb = new Plumbify (this, opts, type);

	this.next = null;
}

Pointer.prototype.getElem = function(){ return this.elem; }
Pointer.prototype.getPlumb = function(){ return this.plumb; }
Pointer.prototype.getSrc = function(){ return this.plumb && this.plumb.getSource(); }
Pointer.prototype.getEndpoint = function(){ return this.plumb && this.plumb.endpoint; }
Pointer.prototype.getPrev = function(){ return this.prev; }
Pointer.prototype.getNext = function(){ return this.next; }
Pointer.prototype.isDragging = function(){ return this.plumb.isDragging(); }
Pointer.prototype.setDragging = function(d) { this.plumb.setDragging (d); }
Pointer.prototype.isAuto = function(){ return !this.getEndpoint().isEnabled(); }
Pointer.prototype.setNext = function(n, u){
	this.next = n;
	if (this.nextChanged) this.nextChanged (n, u);
}

Pointer.prototype.plumbify = function(){
	if (this.plumb) this.plumb.remove();

	this.plumb = new Plumbify(this, {hasEndpoint: true});
}

Pointer.prototype.reposition = function(){ this.plumb.reposition(); }
Pointer.prototype.detach = function (){
	this.plumb.detach ();
}

Pointer.prototype.setPrev = function(n){
	if (!n) this.prev = null;
	else this.prev = findNodeFromTarg (n);
}

Pointer.prototype.setEnabled = function(n){
	this.getPlumb ().setEnabled (n);
}
Pointer.prototype.setAuto = function(){
	this.getEndpoint().setEnabled (false);
}
Pointer.prototype.setActive = function(){
	this.getEndpoint().setEnabled (true);
}

Pointer.prototype.disconnect = function(){
	this.connectNext (null);
	this.plumb.disconnect ();
}
Pointer.prototype.connectTo = function(n, opts){
	if (!n) return;

	this.setNext (n, opts);
	this.plumb.connectTo (n.getElem());
}

Pointer.prototype.remove = function (){
	if (this.plumb) this.plumb.remove ();
}

function findNodeFromPointer (t){
	if (t === null) return null;
	else{
		return Nodes.find (function (el){
			return (el.getPtr() === t);
		})
	}
}
function findNodeFromTarg (n){
	if (n === null) return null;
	else if (!DOM.contains(n)) return n;
	else{
		n = $(n);
		return Nodes.find (function (el){
			if (!el.getTarg()) return false;
			return n.is(el.getTarg())
		});
	}
}
