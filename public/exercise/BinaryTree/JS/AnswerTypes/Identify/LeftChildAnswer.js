/*jshint esversion: 6 */ 'use strict';

class LeftChildAnswer extends IdentityAnswer {
  include (data, node, details){
    return node.parent && node.parent.left === node;
  }
}
