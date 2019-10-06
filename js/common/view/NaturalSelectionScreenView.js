// Copyright 2019, University of Colorado Boulder

/**
 * NaturalSelectionScreenView is the base class for all ScreenViews in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AddAMateButton = require( 'NATURAL_SELECTION/common/view/AddAMateButton' );
  const ClimateRadioButtonGroup = require( 'NATURAL_SELECTION/common/view/ClimateRadioButtonGroup' );
  const GraphRadioButtonGroup = require( 'NATURAL_SELECTION/common/view/GraphRadioButtonGroup' );
  const LimitedFoodCheckbox = require( 'NATURAL_SELECTION/common/view/LimitedFoodCheckbox' );
  const naturalSelection = require( 'NATURAL_SELECTION/naturalSelection' );
  const NaturalSelectionConstants = require( 'NATURAL_SELECTION/common/NaturalSelectionConstants' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const WorldNode = require( 'NATURAL_SELECTION/common/view/WorldNode' );

  class NaturalSelectionScreenView extends ScreenView {

    /**
     * @param {NaturalSelectionModel} model
     * @param {NaturalSelectionViewProperties} viewProperties
     * @param {Tandem} tandem
     */
    constructor( model, viewProperties, tandem ) {

      super( {
        tandem: tandem
      } );

      const worldNode = new WorldNode( 0.75 * this.layoutBounds.width, 0.5 * this.layoutBounds.height, {
        left: this.layoutBounds.left + NaturalSelectionConstants.SCREEN_VIEW_X_MARGIN,
        top: this.layoutBounds.top + NaturalSelectionConstants.SCREEN_VIEW_Y_MARGIN
      } );

      const limitedFoodCheckbox = new LimitedFoodCheckbox( model.limitFoodProperty, {
        left: worldNode.left + NaturalSelectionConstants.WORLD_NODE_X_MARGIN,
        top: worldNode.top + NaturalSelectionConstants.WORLD_NODE_Y_MARGIN
      } );

      const climateRadioButtonGroup = new ClimateRadioButtonGroup( model.climateProperty, {
        right: worldNode.right - NaturalSelectionConstants.WORLD_NODE_X_MARGIN,
        top: worldNode.top + NaturalSelectionConstants.WORLD_NODE_Y_MARGIN
      } );

      const addAMateButton = new AddAMateButton( {
        listener: () => {
          this.addAMateButton.visible = false;
          //TODO
        },
        centerX: worldNode.centerX,
        bottom: worldNode.bottom - NaturalSelectionConstants.WORLD_NODE_Y_MARGIN
      } );

      const graphRadioButtonGroup = new GraphRadioButtonGroup( viewProperties.graphProperty, {
        left: worldNode.right, //TODO
        bottom: this.layoutBounds.bottom - NaturalSelectionConstants.SCREEN_VIEW_Y_MARGIN
      } );

      const resetAllButton = new ResetAllButton( {
        listener: () => {
          this.interruptSubtreeInput();
          model.reset();
          this.reset();
        },
        right: this.layoutBounds.right - NaturalSelectionConstants.SCREEN_VIEW_X_MARGIN,
        bottom: this.layoutBounds.bottom - NaturalSelectionConstants.SCREEN_VIEW_Y_MARGIN,
        tandem: tandem.createTandem( 'resetAllButton' )
      } );

      // layering
      this.children = [
        worldNode,
        limitedFoodCheckbox,
        climateRadioButtonGroup,
        addAMateButton,
        graphRadioButtonGroup,
        resetAllButton
      ];

      // @private
      this.addAMateButton = addAMateButton;
    }

    /**
     * @public
     */
    reset() {
      this.addAMateButton.visible = true;
      //TODO
    }

    /**
     * @param {number} dt - time step, in seconds
     * @public
     */
    step( dt ) {
      //TODO
    }
  }

  return naturalSelection.register( 'NaturalSelectionScreenView', NaturalSelectionScreenView );
} );