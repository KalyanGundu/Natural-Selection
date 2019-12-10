// Copyright 2019, University of Colorado Boulder

/**
 * ProportionsPanel is the panel that contains controls for the 'Proportions' graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const HSeparator = require( 'SUN/HSeparator' );
  const merge = require( 'PHET_CORE/merge' );
  const naturalSelection = require( 'NATURAL_SELECTION/naturalSelection' );
  const NaturalSelectionColors = require( 'NATURAL_SELECTION/common/NaturalSelectionColors' );
  const NaturalSelectionConstants = require( 'NATURAL_SELECTION/common/NaturalSelectionConstants' );
  const NaturalSelectionPanel = require( 'NATURAL_SELECTION/common/view/NaturalSelectionPanel' );
  const ProportionsLegendNode = require( 'NATURAL_SELECTION/common/view/proportions/ProportionsLegendNode' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const valuesString = require( 'string!NATURAL_SELECTION/values' );

  class ProportionsPanel extends NaturalSelectionPanel {

    /**
     * @param {ProportionsModel} proportionsModel
     * @param {Object} [options]
     */
    constructor( proportionsModel, options ) {

      options = merge( {
        fixedWidth: 100,
        xMargin: 0,

        // phet-io
        tandem: Tandem.required
      }, NaturalSelectionConstants.PANEL_OPTIONS, options );

      const content = new VBox( merge( {}, NaturalSelectionConstants.VBOX_OPTIONS, {
        children: [

          // Values checkbox
          new Checkbox(
            new Text( valuesString, {
              font: NaturalSelectionConstants.CHECKBOX_FONT,
              maxWidth: 100 // determined empirically
            } ),
            proportionsModel.valuesVisibleProperty,
            merge( {
              tandem: options.tandem.createTandem( 'valuesCheckbox' )
            }, NaturalSelectionConstants.CHECKBOX_OPTIONS )
          ),

          // ---------
          new HSeparator( options.fixedWidth - 2 * options.xMargin, {
            stroke: NaturalSelectionColors.SEPARATOR_STROKE,
            tandem: options.tandem.createTandem( 'separator' )
          } ),

          // Legend for alleles
          new ProportionsLegendNode( {
            tandem: options.tandem.createTandem( 'legendNode' )
          } )
        ]
      } ) );

      super( content, options );
    }
  }

  return naturalSelection.register( 'ProportionsPanel', ProportionsPanel );
} );