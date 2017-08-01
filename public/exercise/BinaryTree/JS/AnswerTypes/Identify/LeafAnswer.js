/*jshint esversion: 6 */ 'use strict';

class LeafAnswer extends IdentityAnswer {
  include (data, node, details){
    return (!node.left && !node.right);
  }
}
