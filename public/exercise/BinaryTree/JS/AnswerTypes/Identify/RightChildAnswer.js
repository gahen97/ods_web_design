/*jshint esversion: 6 */ 'use strict';

class RightChildAnswer extends IdentityAnswer {
  include (data, node, details){
    return node.parent && node.parent.right === node;
  }
}
