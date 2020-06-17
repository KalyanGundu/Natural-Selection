// Copyright 2020, University of Colorado Boulder

/**
 * WolfIO is the IO Type for Wolf. It delegates most of its implementation to Wolf.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import validate from '../../../../axon/js/validate.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import naturalSelection from '../../naturalSelection.js';
import Wolf from './Wolf.js';

class WolfIO extends ObjectIO {

  /**
   * Serializes a Wolf instance.
   * @param {Wolf} wolf
   * @returns {Object}
   * @public
   * @override
   */
  static toStateObject( wolf ) {
    validate( wolf, this.validator );
    return wolf.toStateObject();
  }

  /**
   * Deserializes a Wolf instance.
   * @param {Object} stateObject
   * @returns {Object}
   * @public
   * @override
   */
  static fromStateObject( stateObject ) {
    return Wolf.fromStateObject( stateObject );
  }

  /**
   * Creates the args to WolfGroup.createNextElement that creates Wolf instances.
   * @param state
   * @returns {Object[]}
   * @public
   * @override
   */
  static stateToArgsForConstructor( state ) {
    return Wolf.stateToArgsForConstructor( state );
  }

  /**
   * Restores Wolf state after instantiation.
   * @param {Wolf} wolf
   * @param {Object} state
   * @public
   * @override
   */
  static applyState( wolf, state ) {
    validate( wolf, this.validator );
    wolf.applyState( state );
  }
}

WolfIO.documentation = 'IO Type for Wolf';
WolfIO.validator = { isValidValue: value => value instanceof Wolf };
WolfIO.typeName = 'WolfIO';
ObjectIO.validateSubtype( WolfIO );

naturalSelection.register( 'WolfIO', WolfIO );
export default WolfIO;