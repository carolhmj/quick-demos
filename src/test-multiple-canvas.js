var createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.ArcRotateCamera(
    "Camera0",
    0,
    0.8,
    5,
    new BABYLON.Vector3.Zero(),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());

  camera.lowerRadiusLimit = 4;
  camera.upperRadiusLimit = 20;

  var camera1 = new BABYLON.ArcRotateCamera(
    "Camera1",
    0,
    0.8,
    10,
    new BABYLON.Vector3.Zero(),
    scene
  );

  var camera2 = new BABYLON.ArcRotateCamera(
    "Camera2",
    0,
    0.8,
    10,
    new BABYLON.Vector3.Zero(),
    scene
  );

  var camera3 = new BABYLON.ArcRotateCamera(
    "Camera3",
    0,
    0.8,
    10,
    new BABYLON.Vector3.Zero(),
    scene
  );

  // This attaches the camera to the canvas
  camera.attachControl(document.getElementById("renderCanvas0"), true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'sphere' shape.
  var box = BABYLON.MeshBuilder.CreateBox("Box", { size: 2 }, scene);

  box.position.y = 0.5;

  var mat = new BABYLON.PBRMetallicRoughnessMaterial("mat", scene);

  mat.metallic = 1;
  mat.roughness = 0.5;

  box.material = mat;

  scene.createDefaultEnvironment();

  engine.registerView(document.getElementById("renderCanvas0"));
  engine.registerView(document.getElementById("renderCanvas1"), camera1);
  engine.registerView(document.getElementById("renderCanvas2"), camera2);
  engine.registerView(document.getElementById("renderCanvas3"), camera3);

  // Some animations
  var alpha = 0;
  scene.registerBeforeRender(() => {
    camera1.radius = 10 + Math.cos(alpha) * 5;
    camera2.alpha += 0.01;
    camera3.beta = Math.cos(alpha);

    alpha += 0.01;
  });

  var manager = new BABYLON.GUI.GUI3DManager(scene);
  manager.useRealisticScaling = true;
  manager.utilityLayer.setRenderCamera(camera);
  const anchor = new BABYLON.TransformNode("anhcor");
  const position = new BABYLON.Vector3(2, 1, -0.5);
  anchor.position = position;

  // Let's add a button
  let ng = false;
  var button1 = new BABYLON.GUI.TouchHolographicButton("click1");
  manager.addControl(button1);
  button1.linkToTransformNode(anchor);
  button1.position.x = -0.3;
  button1.position.z = -1.5;
  const scale = new BABYLON.Vector3(0.5, 0.5, 0.2);
  button1.scaling = scale;
  button1.text = "click 1";
  button1.onPointerClickObservable.add(() => {
    console.log("button clicked");
    var newBox = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 0.5 },
      scene
    );
    newBox.position = new BABYLON.Vector3(
      1 + Math.random(),
      0.25,
      1 + Math.random()
    );
  });

  box.actionManager = new BABYLON.ActionManager(scene);
  box.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function (evt) {
        const source = evt.meshUnderPointer;
        console.log("-- " + source.name + " picked.");
        var newBox = BABYLON.MeshBuilder.CreateBox(
          "BoxNew",
          { size: 0.5 },
          scene
        );
        newBox.position = new BABYLON.Vector3(
          1 + Math.random(),
          0.25,
          1 + Math.random()
        );
      }
    )
  );

  return scene;
};
