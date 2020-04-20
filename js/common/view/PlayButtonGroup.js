// Copyright 2020, University of Colorado Boulder

/**
 * PlayButtonGroup contains the buttons that can be used to make the simulation begin playing. These buttons are
 * mutually exclusive - at most 1 is visible, depending on the state of the simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import naturalSelection from '../../naturalSelection.js';
import SimulationMode from '../model/SimulationMode.js';
import AddAMateButton from './AddAMateButton.js';
import PlayAgainButton from './PlayAgainButton.js';
import PlayButton from './PlayButton.js';

class PlayButtonGroup extends Node {

  /**
   * @param {EnumerationProperty.<SimulationMode>} simulationModeProperty
   * @param {Property.<number>} numberOfBunniesProperty
   * @param {Object} [options]
   */
  constructor( simulationModeProperty, numberOfBunniesProperty, options ) {
    assert && assert( simulationModeProperty instanceof EnumerationProperty, 'invalid simulationModeProperty' );
    assert && assert( numberOfBunniesProperty instanceof Property, 'invalid numberOfBunniesProperty' );

    options = merge( {

      // {function} callbacks for the buttons, no parameters, no return values
      addAMate: () => {},
      play: () => {},
      playAgain: () => {},

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // 'Add a Mate' push button, for when the initial population consists of a single bunny
    const addAMateButton = new AddAMateButton( {
      listener: () => {
        options.addAMate();
        simulationModeProperty.value = SimulationMode.ACTIVE;
      },
      tandem: options.tandem.createTandem( 'addAMateButton' )
    } );

    // 'Play' push button, for when the initial population consists of more than one bunny
    const playButton = new PlayButton( {
      listener: () => {
        options.play();
        simulationModeProperty.value = SimulationMode.ACTIVE;
      },
      center: addAMateButton.center,
      tandem: options.tandem.createTandem( 'playButton' )
    } );

    // 'Play Again' push button, displayed after the game ends, while the user is reviewing the final state
    const playAgainButton = new PlayAgainButton( {
      listener: () => {
        options.playAgain();
        simulationModeProperty.value = SimulationMode.STAGED;
      },
      center: addAMateButton.center,
      tandem: options.tandem.createTandem( 'playAgainButton' )
    } );

    assert && assert( !options.children, 'PushButtonGroup sets children' );
    options.children = [ addAMateButton, playButton, playAgainButton ];

    super( options );

    Property.multilink(
      [ simulationModeProperty, numberOfBunniesProperty ],
      ( simulationMode, numberOfBunnies ) => {
        if ( simulationMode === SimulationMode.STAGED ) {
          addAMateButton.visible = ( numberOfBunnies === 1 );
          playButton.visible = ( numberOfBunnies > 1 );
          playAgainButton.visible = false;
        }
        else if ( simulationMode === SimulationMode.ACTIVE ) {
          addAMateButton.visible = false;
          playButton.visible = false;
          playAgainButton.visible = false;
        }
        else if ( simulationMode === SimulationMode.COMPLETED ) {
          addAMateButton.visible = false;
          playButton.visible = false;
          playAgainButton.visible = true;
        }
        else {
          throw new Error( `unsupported simulationMode: ${simulationMode}` );
        }

        assert && assert(
          _.filter( [ addAMateButton, playButton, playAgainButton ], button => button.visible ).length <= 1,
          'at most 1 button should be visible'
        );
      }
    );
  }
}

naturalSelection.register( 'PushButtonGroup', PlayButtonGroup );
export default PlayButtonGroup;