import SERVICE_IDENTIFIERS from '../../src/identities/identities';
import { IService } from '../../src/interfaces/IService';
import container from '../../src/ioc/ioc_config';

describe('pre-processor', () => {
    let preProcessor: IService;
    beforeEach(() => {
        preProcessor = container.get<IService>(SERVICE_IDENTIFIERS.PREPROCESSOR);
    });

    test('should be defined', () => {
        expect(preProcessor).toBeDefined();
    });
});