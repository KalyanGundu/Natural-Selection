// Copyright 2019-2020, University of Colorado Boulder

/**
 * PopulationGraphNode displays the population graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import naturalSelectionStrings from '../../../natural-selection-strings.js';
import naturalSelection from '../../../naturalSelection.js';
import PopulationModel from '../../model/PopulationModel.js';
import NaturalSelectionConstants from '../../NaturalSelectionConstants.js';
import DataProbeNode from './DataProbeNode.js';
import GenerationScrollControl from './GenerationScrollControl.js';
import PopulationGraphBackgroundNode from './PopulationGraphBackgroundNode.js';
import ZoomControl from './ZoomControl.js';

const generationString = naturalSelectionStrings.generation;
const populationString = naturalSelectionStrings.population;

// const
const ZOOM_CONTROL_X_OFFSET = 5;
const X_AXIS_LABEL_OFFSET = 7;
const Y_AXIS_LABEL_OFFSET = 7;

class PopulationGraphNode extends Node {

  /**
   * @param {PopulationModel} populationModel
   * @param {Object} [options]
   */
  constructor( populationModel, options ) {

    assert && assert( populationModel instanceof PopulationModel, 'invalid populationModel' );

    options = merge( {
      graphWidth: 100,
      graphHeight: 100,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // invisible rectangle that defines the bounds of this Node
    const boundsRectangle = new Rectangle( 0, 0, options.graphWidth, options.graphHeight );

    // Generation (x-axis) scroll control
    const generationScrollControl = new GenerationScrollControl(
      populationModel.xRangeProperty, populationModel.generationsProperty, populationModel.isPlayingProperty, {
        labelString: generationString,
        tandem: options.tandem.createTandem( 'generationScrollControl' )
      } );

    // Population (y-axis) zoom control
    const populationZoomControl = new ZoomControl( populationModel.yRangeIndexProperty, {
      orientation: 'vertical',
      zoomLevelMin: populationModel.yRangeIndexProperty.range.min,
      zoomLevelMax: populationModel.yRangeIndexProperty.range.max,
      left: boundsRectangle.left,
      top: boundsRectangle.top,
      tandem: options.tandem.createTandem( 'populationZoomControl' )
    } );

    // y-axis (Population) label
    const yAxisLabelNode = new Text( populationString, {
      font: NaturalSelectionConstants.POPULATION_AXIS_FONT,
      rotation: -Math.PI / 2,
      maxWidth: 90 // determined empirically
    } );

    //TODO fudge factors to fix wonky layout, need to account for tick marks
    const FUDGE_WIDTH = 27;
    const FUDGE_HEIGHT = 20;
    const FUDGE_X_SPACING = 8;

    //TODO better names for these
    // XY plot
    const plotWidth = options.graphWidth - populationZoomControl.width - ZOOM_CONTROL_X_OFFSET - FUDGE_WIDTH;
    const plotHeight = options.graphHeight - generationScrollControl.height - X_AXIS_LABEL_OFFSET - FUDGE_HEIGHT;

    const backgroundNode = new PopulationGraphBackgroundNode( populationModel, {
      backgroundWidth: plotWidth,
      backgroundHeight: plotHeight,
      left: populationZoomControl.right + ZOOM_CONTROL_X_OFFSET + FUDGE_X_SPACING,
      y: boundsRectangle.top
    } );

    // center x-axis control under the graph
    generationScrollControl.centerX = backgroundNode.x + ( plotWidth / 2 );
    generationScrollControl.top = backgroundNode.bottom + X_AXIS_LABEL_OFFSET;
    yAxisLabelNode.right = populationZoomControl.right + ZOOM_CONTROL_X_OFFSET - Y_AXIS_LABEL_OFFSET;
    yAxisLabelNode.centerY = backgroundNode.y + ( plotHeight / 2 );

    const dataProbeNode = new DataProbeNode( populationModel, backgroundNode.x, plotWidth, plotHeight, {
      x: backgroundNode.x,
      top: backgroundNode.y,
      tandem: options.tandem.createTandem( 'dataProbeNode' )
    } );

    assert && assert( !options.children, 'PopulationGraphNode sets children' );
    options.children = [
      boundsRectangle, backgroundNode,
      generationScrollControl,
      populationZoomControl, yAxisLabelNode,
      dataProbeNode
    ];

    super( options );

    // @private
    this.dataProbeNode = dataProbeNode;
  }

  /**
   * @public
   */
  reset() {
    this.dataProbeNode.reset();
  }

  /**
   * @public
   * @override
   */
  dispose() {
    assert && assert( false, 'PopulationGraphNode does not support dispose' );
  }
}

naturalSelection.register( 'PopulationGraphNode', PopulationGraphNode );
export default PopulationGraphNode;