// Copyright 2019, University of Colorado Boulder

/**
 * EnvironmentNode shows the background image that corresponds to the abiotic environment.
 * The image is scaled to fit the specified dimensions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Environments = require( 'NATURAL_SELECTION/common/model/Environments' );
  const merge = require( 'PHET_CORE/merge' );
  const naturalSelection = require( 'NATURAL_SELECTION/naturalSelection' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );

  // images
  const arcticBackgroundImage = require( 'image!NATURAL_SELECTION/arcticBackground.png' );
  const equatorBackgroundImage = require( 'image!NATURAL_SELECTION/equatorBackground.png' );

  class EnvironmentNode extends Node {

    /**
     * @param {EnumerationProperty.<Environments>} environmentProperty
     * @param {Dimension2} size - dimensions of the backgrounds, in view coordinates
     * @param {number} horizonY - y coordinate of the horizon, in view coordinates
     * @param {Object} [options]
     */
    constructor( environmentProperty, size, horizonY, options ) {

      options = merge( {}, options );

      // Equator background, scaled to fit
      const equatorBackground = new Image( equatorBackgroundImage );
      equatorBackground.setScaleMagnitude( size.width / equatorBackground.width, size.height / equatorBackground.height );

      // Arctic background, scaled to fit
      const arcticBackground = new Image( arcticBackgroundImage );
      arcticBackground.setScaleMagnitude( size.width / arcticBackground.width, size.height / arcticBackground.height );

      // Horizon line, for debugging. Bunnies cannot go further from the viewer than this line.
      const horizonLine = new Line( 0, horizonY, size.width, horizonY, {
        stroke: phet.chipper.queryParameters.dev ? 'red' : null,
        lineWidth: 1
      } );

      assert && assert( !options.children, 'EnvironmentNode sets children' );
      options.children = [ equatorBackground, arcticBackground, horizonLine ];

      super( options );

      environmentProperty.link( climate => {
        equatorBackground.visible = ( climate === Environments.EQUATOR );
        arcticBackground.visible = ( climate === Environments.ARCTIC );
      } );
    }
  }

  return naturalSelection.register( 'EnvironmentNode', EnvironmentNode );
} );