// Copyright 2019-2020, University of Colorado Boulder

/**
 * ProportionsModel is the sub-model used by the Proportion view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import ObservableArray from '../../../../axon/js/ObservableArray.js';
import ObservableArrayIO from '../../../../axon/js/ObservableArrayIO.js';
import Property from '../../../../axon/js/Property.js';
import PropertyIO from '../../../../axon/js/PropertyIO.js';
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import naturalSelection from '../../naturalSelection.js';
import NaturalSelectionUtils from '../NaturalSelectionUtils.js';
import BunnyCounts from './BunnyCounts.js';
import BunnyCountsSnapshotIO from './BunnyCountsSnapshotIO.js';
import ProportionsData from './ProportionsData.js';
import ProportionsDataIO from './ProportionsDataIO.js';

class ProportionsModel extends PhetioObject {

  /**
   * @param {BunnyCounts} liveBunnyCounts - counts of live bunnies, used for dynamic 'Currently' data
   * @param {Property.<number>} currentGenerationProperty
   * @param {Property.<boolean>} isPlayingProperty
   * @param {EnumerationProperty.<SimulationMode>} simulationModeProperty
   * @param {Object} [options]
   */
  constructor( liveBunnyCounts, currentGenerationProperty, isPlayingProperty, simulationModeProperty, options ) {

    assert && assert( liveBunnyCounts instanceof BunnyCounts, 'invalid bunnyCounts' );
    assert && NaturalSelectionUtils.assertPropertyTypeof( currentGenerationProperty, 'number' );
    assert && NaturalSelectionUtils.assertPropertyTypeof( isPlayingProperty, 'boolean' );
    assert && assert( simulationModeProperty instanceof EnumerationProperty );

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioState: false, // to prevent serialization, because we don't have an IO type
      phetioDocumentation: 'model elements that are specific to the Proportions feature'
    }, options );

    super( options );

    // @private
    this.currentGenerationProperty = currentGenerationProperty;

    // @public
    this.valuesVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'valuesVisibleProperty' ),
      phetioDocumentation: 'determines whether values are visible on the bars in the Proportions graph'
    } );

    // @private Range of generationProperty changes as the number of generations increases. Our first instinct is
    // that this should be a DerivedProperty, derived from currentGenerationProperty. But this cannot be a
    // DerivedProperty because we need to use NumberProperty.setValueAndRange to update generationProperty's
    // value and range atomically, and a DerivedProperty cannot be set directly.
    // See https://github.com/phetsims/axon/issues/289
    this.generationRangeProperty = new Property( new Range( 0, 0 ) );

    // @public the generation that is displayed by the Proportions graph
    this.generationProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      range: this.generationRangeProperty, //TODO replace with new Range( 0, 0 )
      tandem: options.tandem.createTandem( 'generationProperty' ),
      phetioReadOnly: true // range is dynamic
    } );

    // @public whether the Proportions graph is displaying the current generation
    this.isDisplayingCurrentGenerationProperty = new DerivedProperty(
      [ this.generationProperty, currentGenerationProperty ],
      ( generation, currentGeneration ) => ( generation === currentGeneration )
    );

    // @public counts for 'Start of Generation'
    this.startCounts = new BunnyCounts( {
      tandem: options.tandem.createTandem( 'startCounts' )
    } );

    // @public counts for 'End of Generation'
    this.endCounts = new BunnyCounts( {
      tandem: options.tandem.createTandem( 'endCounts' )
    } );

    const currentGenerationStartSnapshotProperty = new Property( null, {
      tandem: options.tandem.createTandem( 'currentGenerationStartSnapshotProperty' ),
      phetioType: PropertyIO( NullableIO( BunnyCountsSnapshotIO ) ),
      phetioDocumentation: 'Counts at the start of the current generation'
    } );

    const previousGenerationsDataArray = new ObservableArray( {
      tandem: options.tandem.createTandem( 'previousGenerationsDataArray' ),
      phetioType: ObservableArrayIO( ProportionsDataIO ),
      phetioDocumentation: 'Counts for previous generations, indexed by generation number'
    } );

    // Pause the sim when a generation other than the current generation is being viewed.
    this.generationProperty.link( generation => {
      if ( generation !== currentGenerationProperty.value ) {
        isPlayingProperty.value = false;
      }
    } );

    // When the sim starts playing or the current generation changes, show the current generation immediately.
    Property.multilink(
      [ isPlayingProperty, currentGenerationProperty ],
      ( isPlaying, currentGeneration ) => {
        if ( isPlaying ) {
          this.generationProperty.setValueAndRange( currentGeneration, new Range( 0, currentGeneration ) );
        }
      } );

    //TODO #57 There's an ordering problem here. currentGenerationStartSnapshotProperty will be set by another
    // currentGenerationProperty listener in NaturalSelectionModel, via a call to recordStartData.  So the
    // value of currentGenerationStartSnapshotProperty may or may not be correct here.
    Property.multilink(
      [ this.generationProperty, currentGenerationProperty ],
      ( generation, currentGeneration ) => {
        if ( generation === currentGeneration ) {

          // // Show dynamic data for the current generation.
          // this.startCounts.setValues( currentGenerationStartSnapshotProperty.value );
          //
          // //TODO #57 endCounts need to update dynamically, wired to bunnyCollection.liveBunnies.counts
          // this.endCounts.setValues( currentGenerationStartSnapshotProperty.value );
        }
        else {

          // Show static data for a previous generation.
          const data = previousGenerationsDataArray.get( generation );
          this.startCounts.setValues( data.startSnapshot );
          this.endCounts.setValues( data.endSnapshot );
        }
      } );

    // @private
    this.currentGenerationStartSnapshotProperty = currentGenerationStartSnapshotProperty;
    this.previousGenerationsDataArray = previousGenerationsDataArray;
  }

  /**
   * @public
   */
  reset() {
    this.valuesVisibleProperty.reset();
    this.generationProperty.resetValueAndRange();
    this.startCounts.reset();
    this.endCounts.reset();
    this.currentGenerationStartSnapshotProperty.reset();
    this.previousGenerationsDataArray.clear();
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'ProportionsModel does not support dispose' );
  }

  /**
   * Records the start data for the current generation.
   * @param {generation} generation
   * @param {BunnyCountsSnapshot} startSnapshot
   */
  recordStartData( generation, startSnapshot ) {
    assert && assert( generation === this.currentGenerationProperty.value, `${generation} is not the current generation` );
    this.currentGenerationStartSnapshotProperty.value = startSnapshot;
    phet.log && phet.log( `ProportionsModel recorded start data for generation ${generation}` );
  }

  /**
   * Records the end data for the previous generation, using what was formerly the current generation start data.
   * @param {number} generation
   * @param {BunnyCountsSnapshot} endSnapshot
   * @public
   */
  recordEndData( generation, endSnapshot ) {
    assert && assert( generation === this.currentGenerationProperty.value - 1, `${generation} is not the previous generation` );
    assert && assert( this.previousGenerationsDataArray.length === generation, `data already exists for generation ${generation}` );

    const data = new ProportionsData( generation,
      this.currentGenerationStartSnapshotProperty.value,
      endSnapshot );
    this.previousGenerationsDataArray.push( data );

    this.currentGenerationStartSnapshotProperty.value = null;

    phet.log && phet.log( `ProportionsModel recorded end data for generation ${generation}` );
  }
}

naturalSelection.register( 'ProportionsModel', ProportionsModel );
export default ProportionsModel;