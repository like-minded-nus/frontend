const Demo = () => {
    return (
        <>
            <div className='demo-container'>
                <div className='input-group'>
                    <label htmlFor='tb_demo_1'>Username</label>
                    <input id='tb_demo_1' />
                </div>
                <div className='input-group'>
                    <label htmlFor='tb_demo_2'>Password</label>
                    <input id='tb_demo_2' type='password' />
                </div>
                <div className='input-group'>
                    <input id='tb_demo_3' placeholder='Placeholder' />
                </div>
                <div className='input-group top-label'>
                    <label htmlFor='tb_demo_4'>Top Label</label>
                    <input id='tb_demo_4' />
                </div>
                <div>
                    <button className='btn'>Button</button>
                </div>
                <div>
                    <button className='btn btn-primary'>Button</button>
                    <button className='btn btn-primary btn-solid'>Solid</button>
                </div>
                <div>
                    <button className='btn btn-secondary'>Button</button>
                    <button className='btn btn-secondary btn-solid'>
                        Solid
                    </button>
                </div>
            </div>
        </>
    );
};

export default Demo;
