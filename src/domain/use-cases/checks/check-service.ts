interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccessCalback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCalback,
        private readonly errorCallback: ErrorCallback,
    ) {}

    public async execute( url: string ): Promise<boolean> {

        try {
            const req = await fetch(url);
            if( !req.ok ) {
                throw new Error(`Service on check service ${ url }`);
            }

            this.successCallback();
            return true;
        } catch (error) {

            console.log(`${ error }`);
            this.errorCallback(`${ error }`);
            return false;
        }


    }


}



