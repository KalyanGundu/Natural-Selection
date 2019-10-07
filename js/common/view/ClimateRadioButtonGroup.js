// Copyright 2019, University of Colorado Boulder

/**
 * ClimateRadioButtonGroup is the radio button group for choosing a climate.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Climates = require( 'NATURAL_SELECTION/common/model/Climates' );
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const naturalSelection = require( 'NATURAL_SELECTION/naturalSelection' );
  const NaturalSelectionConstants = require( 'NATURAL_SELECTION/common/NaturalSelectionConstants' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  const ICON_X_MARGIN = 8;
  const ICON_Y_MARGIN = 6;

  class ClimateRadioButtonGroup extends RadioButtonGroup {

    /**
     * @param {EnumerationProperty} climateProperty
     * @param {Object} [options]
     */
    constructor( climateProperty, options ) {

      options = _.extend( {
        orientation: 'horizontal',
        spacing: 8,
        cornerRadius: NaturalSelectionConstants.CORNER_RADIUS,
        selectedLineWidth: 2,
        deselectedLineWidth: 1,
        deselectedButtonOpacity: 0.2,

        // Set to 0 because we will create our own backgrounds, see below.
        buttonContentXMargin: 0,
        buttonContentYMargin: 0
      }, options );

      const fontAwesomeOptions = { scale: 2, fill: 'white' };

      // icons
      const sunIcon = new FontAwesomeNode( 'sun_solid', fontAwesomeOptions );
      const snowflakeIcon = new FontAwesomeNode( 'snowflake', fontAwesomeOptions );

      // RadioButtonGroup does not support different colors for radio buttons in the same group. So here we
      // create our own backgrounds, with a cornerRadius that matches options.cornerRadius.
      const buttonWidth = _.maxBy( [ sunIcon, snowflakeIcon ], icon => icon.width ).width + ( 2 * ICON_X_MARGIN );
      const buttonHeight = _.maxBy( [ sunIcon, snowflakeIcon ], icon => icon.height ).height + ( 2 * ICON_Y_MARGIN );
      const sunBackground = new Rectangle( 0, 0, buttonWidth, buttonHeight, {
        cornerRadius: NaturalSelectionConstants.CORNER_RADIUS,
        fill: 'rgb( 207, 125, 66 )',
        center: sunIcon.center
      } );
      const snowflakeBackground = new Rectangle( 0, 0, buttonWidth, buttonHeight, {
        cornerRadius: NaturalSelectionConstants.CORNER_RADIUS,
        fill: 'rgb( 54, 137, 239 )',
        center: snowflakeIcon.center
      } );

      // icons on backgrounds
      const sunParent = new Node( { children: [ sunBackground, sunIcon ] } );
      const snowflakeParent = new Node( { children: [ snowflakeBackground, snowflakeIcon ] } );
      
      // Create the description of the buttons
      const content = [
        { value: Climates.EQUATOR, node: sunParent },
        { value: Climates.ARCTIC, node: snowflakeParent }
      ];

      super( climateProperty, content, options );
    }
  }

  return naturalSelection.register( 'ClimateRadioButtonGroup', ClimateRadioButtonGroup );
} );