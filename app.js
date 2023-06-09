import { eClusterMestre, masterClusterWork } from './modulos/masterCluster.js';
import childrenClusterWork from './modulos/childrenCluster.js';

if(eClusterMestre()) {
    masterClusterWork();
} else {
    childrenClusterWork();
}