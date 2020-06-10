// Copyright 2020, University of Colorado Boulder

/**
 * PedigreeModel is the sub-model used by the Pedigree view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import naturalSelection from '../../naturalSelection.js';
import SelectedBunnyProperty from './SelectedBunnyProperty.js';

class PedigreeModel extends PhetioObject {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioState: false, // to prevent serialization, because we don't have an IO type
      phetioDocumentation: 'model elements that are specific to the Pedigree feature'
    }, options );

    super( options );

    // @public
    this.selectedBunnyProperty = new SelectedBunnyProperty( {
      tandem: options.tandem.createTandem( 'selectedBunnyProperty' )
    } );

    // unlink is not necessary.
    phet.log && this.selectedBunnyProperty.link( selectedBunny => {
      phet.log && phet.log( `selectedBunny=${selectedBunny}` );
    } );

    // @public visibility of the alleles for each gene type in the Pedigree tree
    this.furAllelesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'furAllelesVisibleProperty' )
    } );
    this.earsAllelesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'earsAllelesVisibleProperty' )
    } );
    this.teethAllelesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'teethAllelesVisibleProperty' )
    } );
  }

  /**
   * @public
   */
  reset() {
    this.selectedBunnyProperty.reset();
    this.furAllelesVisibleProperty.reset();
    this.earsAllelesVisibleProperty.reset();
    this.teethAllelesVisibleProperty.reset();
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

naturalSelection.register( 'PedigreeModel', PedigreeModel );
export default PedigreeModel;