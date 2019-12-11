// Copyright 2019, University of Colorado Boulder

/**
 * ScrollControl is the control for 1-dimensional scrolling.
 * In this sim, it's used for scrolling the x axis of the Population graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ArrowButton = require( 'SUN/buttons/ArrowButton' );
  const merge = require( 'PHET_CORE/merge' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const naturalSelection = require( 'NATURAL_SELECTION/naturalSelection' );
  const NaturalSelectionConstants = require( 'NATURAL_SELECTION/common/NaturalSelectionConstants' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );

  class ScrollControl extends HBox {

    /**
     * @param {string} labelString
     * @param {Object} [options]
     */
    constructor( labelString, options ) {

      options = merge( {
        font: NaturalSelectionConstants.POPULATION_AXIS_FONT,
        previous: () => {},
        next: () => {},

        // HBox options
        spacing: 10,

        // phet-io
        tandem: Tandem.required
      }, options );

      // label
      const xAxisLabelNode = new Text( labelString, {
        font: options.font,
        maxWidth: 120 // determined empirically
      } );

      // previous button
      const previousButton = new ArrowButton( 'left', options.previous,
        merge( {
          tandem: options.tandem.createTandem( 'previousButton' )
        }, NaturalSelectionConstants.ARROW_BUTTON_OPTIONS )
      );

      // next button
      const nextButton = new ArrowButton( 'right', options.next,
        merge( {
          tandem: options.tandem.createTandem( 'nextButton' )
        }, NaturalSelectionConstants.ARROW_BUTTON_OPTIONS )
      );

      assert && assert( !options.children, 'ScrollControl sets children' );
      options.children = [ previousButton, xAxisLabelNode, nextButton ];

      super( options );
    }
  }

  return naturalSelection.register( 'ScrollControl', ScrollControl );
} );