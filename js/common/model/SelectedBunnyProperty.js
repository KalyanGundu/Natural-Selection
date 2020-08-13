// Copyright 2020, University of Colorado Boulder

/**
 * SelectedBunnyProperty is the Property used for the selected bunny in the Pedigree model.
 * A null value indicates that there is no selection.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import PropertyIO from '../../../../axon/js/PropertyIO.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import naturalSelection from '../../naturalSelection.js';
import BunnyIO from './BunnyIO.js';

class SelectedBunnyProperty extends Property {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // {Bunny|null} null means no selection
      selectedBunny: null,

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioType: PropertyIO( NullableIO( ReferenceIO( BunnyIO ) ) ),
      phetioDocumentation: 'the selected bunny, null if no bunny is selected'
    }, options );

    super( options.selectedBunny, options );
  }
}

naturalSelection.register( 'SelectedBunnyProperty', SelectedBunnyProperty );
export default SelectedBunnyProperty;