// Copyright 2019-2020, University of Colorado Boulder

/**
 * ProportionGraphNode displays the Proportions graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Property from '../../../../../axon/js/Property.js';
import merge from '../../../../../phet-core/js/merge.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import AlignBox from '../../../../../scenery/js/nodes/AlignBox.js';
import AlignGroup from '../../../../../scenery/js/nodes/AlignGroup.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import naturalSelection from '../../../naturalSelection.js';
import naturalSelectionStrings from '../../../naturalSelectionStrings.js';
import ProportionsModel from '../../model/ProportionsModel.js';
import NaturalSelectionColors from '../../NaturalSelectionColors.js';
import ProportionsBarNode from './ProportionsBarNode.js';
import PopulationGenerationSpinner from './ProportionsGenerationSpinner.js';

// constants
const COLUMNS_SPACING = 20;
const LABEL_FONT = new PhetFont( 14 );
const VALUE_FONT = new PhetFont( 14 );

class ProportionsGraphNode extends Node {

  /**
   * @param {ProportionsModel} proportionsModel
   * @param {Object} [options]
   */
  constructor( proportionsModel, options ) {

    assert && assert( proportionsModel instanceof ProportionsModel, 'invalid proportionsModel' );

    options = merge( {
      graphWidth: 100,
      graphHeight: 100,

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioComponentOptions: { visibleProperty: { phetioReadOnly: true } }
    }, options );

    const backgroundNode = new Rectangle( 0, 0, options.graphWidth, options.graphHeight, {
      fill: NaturalSelectionColors.PROPORTIONS_GRAPH_FILL,
      stroke: NaturalSelectionColors.PANEL_STROKE
    } );

    const labelColumnAlignGroup = new AlignGroup();
    const barColumnsAlignGroup = new AlignGroup( { matchVertical: false } );

    // Column labels
    const columnLabelOptions = {
      font: LABEL_FONT,
      maxWidth: 120 // determined empirically
    };
    const columnLabels = new HBox( {
      spacing: COLUMNS_SPACING,
      children: [
        new AlignBox( new Text( '', columnLabelOptions ), { group: barColumnsAlignGroup } ),

        //TODO get names from Gene.name
        new AlignBox( new Text( naturalSelectionStrings.fur, columnLabelOptions ), { group: barColumnsAlignGroup } ),
        new AlignBox( new Text( naturalSelectionStrings.ears, columnLabelOptions ), { group: barColumnsAlignGroup } ),
        new AlignBox( new Text( naturalSelectionStrings.teeth, columnLabelOptions ), { group: barColumnsAlignGroup } )
      ]
    } );

    // Rows
    const startRow = new Row( naturalSelectionStrings.startOfGeneration, proportionsModel.startCountProperty,
      labelColumnAlignGroup, barColumnsAlignGroup, proportionsModel.valuesVisibleProperty );
    // const currentRow = new Row( naturalSelectionStrings.endOfGeneration, proportionsModel.endCountProperty,
    const currentRow = new Row( naturalSelectionStrings.currently, proportionsModel.endCountProperty,
      labelColumnAlignGroup, barColumnsAlignGroup, proportionsModel.valuesVisibleProperty );
    const rows = new VBox( {
      spacing: 30,
      align: 'left',
      children: [ startRow, currentRow ]
    } );

    // Column labels above rows
    const graph = new VBox( {
      spacing: 20,
      align: 'left',
      children: [ columnLabels, rows ]
    } );

    const generationSpinner = new PopulationGenerationSpinner( proportionsModel.generationProperty, {
      tandem: options.tandem.createTandem( 'generationSpinner' )
    } );

    const content = new VBox( {
      align: 'center',
      spacing: 35,
      children: [ graph, generationSpinner ],
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'ProportionGraphNode sets children' );
    options.children = [ backgroundNode, content ];

    super( options );

    // Change the label for the bottom row, depending on whether we're displaying the current generation.
    Property.multilink(
      [ proportionsModel.currentGenerationProperty, proportionsModel.generationProperty ],
      ( currentGeneration, generation ) => {
        if ( currentGeneration === generation ) {
          currentRow.setLabel( naturalSelectionStrings.currently );
        }
        else {
          currentRow.setLabel( naturalSelectionStrings.endOfGeneration );
        }
      } );
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'ProportionsGraphNode does not support dispose' );
  }
}

/**
 * Row is a row in the Proportions graph.
 */
class Row extends HBox {

  /**
   * @param {string} labelString
   * @param {Property.<number>} countProperty
   * @param {AlignGroup} valueAlignGroup
   * @param {AlignGroup} barColumnsAlignGroup
   * @param {Property.<boolean>} valuesVisibleProperty
   */
  constructor( labelString, countProperty, valueAlignGroup, barColumnsAlignGroup, valuesVisibleProperty ) {

    assert && assert( typeof labelString === 'string', 'invalid labelString' );
    assert && assert( countProperty instanceof Property, 'invalid countProperty' );
    assert && assert( valueAlignGroup instanceof AlignGroup, 'invalid valueAlignGroup' );
    assert && assert( barColumnsAlignGroup instanceof AlignGroup, 'invalid barColumnsAlignGroup' );
    assert && assert( valuesVisibleProperty instanceof Property, 'invalid valuesVisibleProperty' );

    const labelNode = new Text( labelString, {
      font: LABEL_FONT,
      maxWidth: 120 // determined empirically
    } );

    // {{count}} bunnies
    const countNode = new Text( '', {
      font: VALUE_FONT,
      maxWidth: 120 // determined empirically
    } );

    const valueVBox = new VBox( {
      spacing: 2,
      align: 'left',
      children: [
        labelNode,
        countNode
      ]
    } );

    //TODO temporary Properties
    //TODO get color from Gene
    const furBarNode = new ProportionsBarNode( NaturalSelectionColors.FUR, new NumberProperty( 990 ), new NumberProperty( 1 ), valuesVisibleProperty );
    const earsBarNode = new ProportionsBarNode( NaturalSelectionColors.EARS, new NumberProperty( 40 ), new NumberProperty( 60 ), valuesVisibleProperty );
    const teethBarNode = new ProportionsBarNode( NaturalSelectionColors.TEETH, new NumberProperty( 100 ), new NumberProperty( 0 ), valuesVisibleProperty );

    super( {
      spacing: COLUMNS_SPACING,
      align: 'bottom', //TODO this looks lousy for ?stringTest=long
      children: [
        new AlignBox( valueVBox, { group: valueAlignGroup, xAlign: 'left' } ),
        new AlignBox( furBarNode, { group: barColumnsAlignGroup, xAlign: 'center' } ),
        new AlignBox( earsBarNode, { group: barColumnsAlignGroup, xAlign: 'center' } ),
        new AlignBox( teethBarNode, { group: barColumnsAlignGroup, xAlign: 'center' } )
      ]
    } );

    countProperty.link( count => {
      if ( count === 1 ) {
        countNode.text = naturalSelectionStrings.oneBunny;
      }
      else {
        countNode.text = StringUtils.fillIn( naturalSelectionStrings.countBunnies, { count: count } );
      }
    } );

    // @private
    this.labelNode = labelNode;
  }

  /**
   * Sets the label for the row.
   * @param {string} labelString
   */
  setLabel( labelString ) {
    this.labelNode.text = labelString;
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'Row does not support dispose' );
  }
}

naturalSelection.register( 'ProportionsGraphNode', ProportionsGraphNode );
export default ProportionsGraphNode;