// Copyright 2019, University of Colorado Boulder

/**
 * HatchingRectangle is a Rectangle that appears as if it's filled with a hatching pattern.
 * 
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const merge = require( 'PHET_CORE/merge' );
  const naturalSelection = require( 'NATURAL_SELECTION/naturalSelection' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );

  class HatchingRectangle extends Rectangle {

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Object} [options]
     */
    constructor( x, y, width, height, options ) {

      options = merge( {

        // options for the hatching pattern
        hatchingOptions: {
          stroke: 'white',
          lineWidth: 2,
          rotation: -Math.PI / 4
        },

        // Rectangle options
        fill: 'black',
        stroke: null

      }, options );

      assert && assert( !options.children, 'HatchingRectangle sets children' );
      assert && assert( !options.clipArea, 'HatchingRectangle sets clipArea' );

      super( 0, 0, width, height, options );

      // @private
      this.hatchingLineWidth = options.hatchingOptions.lineWidth;

      // @private
      this.linesPath = new Path( new Shape(), options.hatchingOptions );
      this.addChild( this.linesPath );

      // this.linesPath did not exist the first time that invalidateRectangle was called by super.
      this.invalidateRectangle();
    }

    /**
     * Notifies that the rectangle has changed, and invalidates path information and our cached shape.
     * @protected
     * @override
     */
    invalidateRectangle() {
      super.invalidateRectangle();

      // this.linesPath did not exist the first time that invalidateRectangle was called by super.
      if ( this.linesPath ) {

        // Draw equally-spaces lines on top of the rectangle to create a hatching pattern. The lines are drawn
        // horizontally as a single Shape, then rotated to the desired angle. The bounds of the lines is 2x the
        // largest dimensions of the rectangle, so that the hatching pattern can be rotated arbitrarily.
        let lineY = 0;
        const linesShape = new Shape();
        const maxDimension = Math.max( this.rectWidth, this.rectHeight );
        while ( lineY <= 2 * maxDimension ) {
          linesShape.moveTo( 0, lineY ).lineTo( 2 * maxDimension, lineY );
          lineY = lineY + 2 * this.hatchingLineWidth;
        }
        this.linesPath.setShape( linesShape );

        // Center hatching lines in the rectangle
        this.linesPath.centerX = this.rectX + this.rectWidth / 2;
        this.linesPath.centerY = this.rectY + this.rectHeight / 2;
      }

      // Clip to the shape of the rectangle
      this.clipArea = this.shape;
    }
  }

  return naturalSelection.register( 'HatchingRectangle', HatchingRectangle );
} );