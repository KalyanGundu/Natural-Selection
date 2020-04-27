// Copyright 2020, University of Colorado Boulder

/**
 * FoodNode is one item of food, which can toggle between 'tender' and 'tough'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import naturalSelection from '../../naturalSelection.js';
import Food from '../model/Food.js';
import NaturalSelectionQueryParameters from '../NaturalSelectionQueryParameters.js';
import SpriteNode from './SpriteNode.js';

// constants
const IMAGE_SCALE = 0.5; // how much the food PNG images are scaled

class FoodNode extends SpriteNode {

  /**
   * @param {Food} food
   * @param {Object} [options]
   */
  constructor( food, options ) {

    assert && assert( food instanceof Food, 'invalid food' );

    options = merge( {}, options );

    const toughFoodNode = new Image( food.toughImage, {
      scale: IMAGE_SCALE,
      centerX: 0,
      bottom: 0
    } );

    const tenderFoodNode = new Image( food.tenderImage, {
      scale: IMAGE_SCALE,
      centerX: toughFoodNode.centerX,
      bottom: toughFoodNode.bottom
    } );

    assert && assert( !options.children, 'FoodNode sets children' );
    options.children = [ toughFoodNode, tenderFoodNode ];

    // Red dot at the origin
    if ( NaturalSelectionQueryParameters.showOrigin ) {
      options.children.push( new Circle( 2, { fill: 'red' } ) );
    }

    // Show the tandem name
    if ( NaturalSelectionQueryParameters.showSpriteInfo ) {
      options.children.push( new Text( food.tandem.name, {
        font: new PhetFont( 12 ),
        fill: 'black',
        centerX: toughFoodNode.centerX,
        top: toughFoodNode.bottom + 5
      } ) );
    }

    super( food, options );

    // Show/hide food
    food.visibleProperty.link( visible => {
      this.visible = visible;
    } );

    //TODO use ToggleNode
    // Toggle the look of the food between tender and tough.
    food.isToughProperty.link( isTough => {
      toughFoodNode.visible = isTough;
      tenderFoodNode.visible = !isTough;
    } );
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'FoodNode does not support dispose' );
  }
}

naturalSelection.register( 'FoodNode', FoodNode );
export default FoodNode;