// Copyright 2020, University of Colorado Boulder

/**
 * Food is the model of one item of food.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import naturalSelection from '../../naturalSelection.js';
import Sprite from './Sprite.js';

class Food extends Sprite {

  /**
   * @param {string} debugLabel
   * @param {HTMLImageElement} toughImage
   * @param {HTMLImageElement} tenderImage
   * @param {EnvironmentModelViewTransform} modelViewTransform
   * @param {Object} [options]
   */
  constructor( debugLabel, toughImage, tenderImage, modelViewTransform, options ) {

    assert && assert( !options.tandem, 'Food instances should not be instrumented' );

    super( modelViewTransform, options );

    // @public (read-only)
    this.debugLabel = debugLabel;
    this.toughImage = toughImage;
    this.tenderImage = tenderImage;

    // @public
    this.isToughProperty = new BooleanProperty( false );

    // @public whether the food is visible, used to hide food when the food supply is limited
    this.visibleProperty = new BooleanProperty( true );
  }

  /**
   * @public
   */
  reset() {
    super.reset();
    this.visibleProperty.reset();
    this.isToughProperty.reset();
  }

  /**
   * @public
   */
  dispose() {
    assert && assert( false, 'Food does not support dispose' );
  }
}

naturalSelection.register( 'Food', Food );
export default Food;