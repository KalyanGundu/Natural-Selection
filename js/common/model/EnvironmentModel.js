// Copyright 2019-2020, University of Colorado Boulder

/**
 * EnvironmentModel is the sub-model that encapsulates the environment.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Bunny = require( 'NATURAL_SELECTION/common/model/Bunny' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const EnvironmentModelViewTransform = require( 'NATURAL_SELECTION/common/model/EnvironmentModelViewTransform' );
  const Environments = require( 'NATURAL_SELECTION/common/model/Environments' );
  const Food = require( 'NATURAL_SELECTION/common/model/Food' );
  const LimitedFood = require( 'NATURAL_SELECTION/common/model/LimitedFood' );
  const naturalSelection = require( 'NATURAL_SELECTION/naturalSelection' );
  const PhetioObject = require( 'TANDEM/PhetioObject' );
  const ToughFood = require( 'NATURAL_SELECTION/common/model/ToughFood' );
  const Wolves = require( 'NATURAL_SELECTION/common/model/Wolves' );

  class EnvironmentModel extends PhetioObject {

    /**
     * @param {GenerationClock} generationClock
     * @param {Tandem} tandem
     */
    constructor( generationClock, tandem ) {

      super( {
        tandem: tandem,
        phetioState: false // to prevent serialization, because we don't have an IO type
      } );

      // @public (read-only)
      this.generationClock = generationClock;

      // @public
      this.modelViewTransform = new EnvironmentModelViewTransform();
      phet.naturalSelection.modelViewTransform = this.modelViewTransform;//XXX TODO delete this

      // @public
      this.environmentProperty = new EnumerationProperty( Environments, Environments.EQUATOR, {
        tandem: tandem.createTandem( 'environmentProperty' )
      } );

      // @public {Food[]}
      this.food = [
        new Food( { position: this.modelViewTransform.viewToModelGroundPosition( this.modelViewTransform.viewSize.width / 4, this.modelViewTransform.yHorizonView ) } ),
        new Food( { position: this.modelViewTransform.viewToModelGroundPosition( this.modelViewTransform.viewSize.width / 4, this.modelViewTransform.viewSize.height ) } )
      ];

      // @public (read-only) {Bunny[]}
      this.bunnies = [ Bunny.createDefault() ];

      //TODO this should be an Emitter
      // @public whether a mate was added to the lone bunny that appears at startup
      this.mateWasAddedProperty = new BooleanProperty( this.bunnies.length > 1 );

      // @public (read-only) the biotic (biological, rather than physical) environmental factors
      this.wolves = new Wolves( tandem.createTandem( 'wolves' ) );
      this.toughFood = new ToughFood( tandem.createTandem( 'toughFood' ) );
      this.limitedFood = new LimitedFood( tandem.createTandem( 'limitedFood' ) );

      // @public whether any environmental factor is enabled
      this.environmentalFactorEnabledProperty = new DerivedProperty(
        [ this.wolves.enabledProperty, this.toughFood.enabledProperty, this.limitedFood.enabledProperty ],
        ( wolvesEnabled, touchFooEnabled, limitedFoodEnabled ) =>
          ( wolvesEnabled || touchFooEnabled || limitedFoodEnabled )
      );
    }

    /**
     * @public
     */
    reset() {
      this.environmentProperty.reset();
      this.mateWasAddedProperty.reset();
      this.wolves.reset();
      this.toughFood.reset();
      this.limitedFood.reset();
    }

    /**
     * @public
     * @override
     */
    dispose() {
      assert && assert( false, 'EnvironmnetModel does not support dispose' );
    }

    /**
     * Resets the initial bunny population. Other settings are preserved.
     * @public
     */
    playAgain() {

      // dispose of all bunnies
      for ( let i = 0; i < this.bunnies.length; i++ ) {
        this.bunnies[ i ].dispose();
      }

      //TODO create the same initial population
      // create a lone bunny
      this.bunnies = [ Bunny.createDefault() ];

      this.mateWasAddedProperty.reset();
    }

    /**
     * Steps the model.
     * @param {number} dt - time step, in seconds
     * @public
     * @override
     */
    step( dt ) {

      // step the bunnies
      for ( let i = 0; i < this.bunnies.length; i++ ) {
        this.bunnies[ i ].step( dt );
      }
    }
  }

  return naturalSelection.register( 'EnvironmentModel', EnvironmentModel );
} );