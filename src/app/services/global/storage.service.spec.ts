import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';



describe('StorageService', () => {
  let service: StorageService;
  let auth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AngularFireAuth', ['createUserWithEmailAndPassword']);

    TestBed.configureTestingModule({
      providers: [StorageService,
        { provide: AngularFireAuth, useValue: authSpy }
      ],

    });

    service = TestBed.inject(StorageService);
    auth = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;
  });

  it('debería agregar y luego obtener un usuario por correo', async () => {
    const userTest = [{id: 100, nombre: 'Kevin', apellido: 'Espinel', correo: 'k.espinelv@duocuc.cl', esConductor: false}];
    try{
      await service.agregarUsuario(userTest);
      const getUser = await service.obtenerUsuarioPorCorreo(userTest[0].correo);
      expect(getUser).toEqual(userTest[0]);
    } catch (error) {
      fail('Error inesperado: ' + error);
    }
  });
});
