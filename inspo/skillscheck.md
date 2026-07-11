which of these would be fit for our project and you:
[~\Documents\mind_grace\Website\preview]
⚡ npx skills add nvidia/skills --list

T skills
|
o Source: https://github.com/nvidia/skills.git
|
o Repository cloned
|
o Found 231 skills

|
o Available Skills
|
| accelerated-computing-cudf
|
| Official NVIDIA-authored guidance for NVIDIA cuDF GPU DataFrames, pandas acceleration, dask-cuDF, ETL, joins, groupby, CSV/Parquet I/O, nullable semantics, and multi-GPU DataFrame workloads.
|
| aiq-deploy
|
| Use when asked to install, deploy, run, validate, troubleshoot, or stop NVIDIA AI-Q Blueprint infrastructure.
|
| aiq-research
|
| Use when asked to run deep research or AI-Q research through a reachable NVIDIA AI-Q Blueprint backend.
|
| amc-run-sample-calibration
|
| Run end-to-end calibration on the shipped sample dataset (sdg_08_2_sample_data_010926.zip) against a running AMC microservice. Use when user says 'test sample dataset', 'run sample calibration', 'verify AMC install', or 'launch and test'.
|
| amc-run-video-calibration
|
| Calibrate a new dataset from pre-recorded video files via the AutoMagicCalib REST API. Use when user has local MP4s and says 'calibrate my videos', 'run AMC on these videos', or similar.
|
| amc-setup-calibration-stack
|
| Launch AutoMagicCalib microservice and web UI from NGC release images via Docker Compose. Use when user says 'deploy auto calibration', 'launch auto calibration', 'launch AMC', 'start MS+UI', or 'set up auto-magic-calib'. Requires NGC API key.
|
| cudaq-guide
|
| CUDA-Q onboarding guide for installation, test programs, GPU simulation, QPU hardware, and quantum applications.
|
| cufolio
|
| Use when a user asks to build, optimize, backtest, rebalance, or analyze a stock portfolio with Mean-CVaR, efficient frontiers, scenario generation, or NVIDIA cuOpt.
|
| cuopt-developer
|
| Modify, build, test, debug, and contribute to NVIDIA cuOpt (C++/CUDA, Python, server, CI). Use for solver internals, PRs, DCO, and code conventions.
|
| cuopt-install
|
| Install cuOpt for Python, C, or server via pip, conda, or Docker; verify the install. For building cuOpt from source, see cuopt-developer.
|
| cuopt-multi-objective-exploration
|
| Trace and interpret the Pareto frontier across competing objectives using repeated single-objective cuOpt solves (weighted-sum and ε-constraint).
|
| cuopt-numerical-optimization-api
|
| LP, MILP, and QP (beta) with cuOpt — Python, C, and CLI. Use when the user is solving LP, MILP, or QP with any cuOpt interface.
|
| cuopt-numerical-optimization-formulation
|
| LP, MILP, QP — concepts, problem-text parsing, and formulation patterns (parameters, constraints, decisions, objective). Concepts only; no API.
|
| cuopt-routing-api-python
|
| Vehicle routing (VRP, TSP, PDP) with cuOpt — Python API only. Use when the user is building or solving routing in Python.
|
| cuopt-server-api-python
|
| cuOpt REST server — start server, endpoints, Python/curl client examples. Use when the user is deploying or calling the REST API.
|
| cuopt-user-rules
|
| Base rules for end users calling NVIDIA cuOpt (routing/LP/MILP/QP/install/server). Not for cuOpt internals — use cuopt-developer for those.
|
| cupynumeric-hdf5
|
| Read and write large cuPyNumeric arrays to HDF5 with Legate's parallel, distributed HDF5 I/O (legate.io.hdf5: to_file, from_file, from_file_batched). Use when a developer needs to save a cuPyNumeric array to an .h5/.hdf5 file, load an HDF5 dataset into a distributed cuPyNumeric array, read a large HDF5 dataset in chunks, hand arrays to an HPC pipeline as a single file, or accelerate HDF5 disk I/O with GPUDirect Storage (GDS). Do not use it for Parquet/cuDF/raw-binary or other sharded/custom layouts (see the cupynumeric-parallel-data-load skill), Zarr or object-store/S3 output, .npz or pickled archives, plain h5py without cuPyNumeric, or pure array compute such as FFT, matmul, or reductions.
|
| cupynumeric-install
|
| Install and verify cuPyNumeric for Python — requirements, commands, verification. Source builds are out of scope.
|
| cupynumeric-migration-readiness
|
| Pre-migration readiness assessor for porting NumPy to cuPyNumeric. Use BEFORE substantial porting work begins when the user asks whether code will scale on GPU, whether they should migrate to cuPyNumeric, which NumPy patterns transfer cleanly, what must be refactored before porting, or mentions pre-port assessment, scaling analysis, or refactor planning. Inspect the user's source code, look up NumPy usage, cross-reference the cuPyNumeric API support manifest, and distinguish distributed-scaling-friendly patterns from blockers such as unsupported APIs, scalar synchronization, host round-trips, Python/object-heavy control flow, shape/data-dependent branching, and in-place mutation hazards. Produce a verdict of READY, LIGHT REFACTOR, SIGNIFICANT REFACTOR, or NOT RECOMMENDED, with concrete refactor pointers.
|
| cupynumeric-parallel-data-load
|
| Load a sharded, on-disk dataset (sharded .npy, Parquet/Arrow, raw binary, sharded HDF5, custom layouts) into a distributed cuPyNumeric ndarray via a manual partition + leaf @task launch with CPU/OMP/GPU variants. Use when no single-call loader fits, including when per-shard row counts differ across files. Prefer cupynumeric.load or legate.io.hdf5.from_file when they apply.
|
| dali-dynamic-mode
|
| DALI imperative dynamic mode (`nvidia.dali.experimental.dynamic`, ndd): use when working on ndd code or migrating pipelines; skip pipeline-only tasks.
|
| data-designer
|
| Use when the user wants to create a dataset, generate synthetic data, or build a data generation pipeline.
|
| deepstream-dev
|
| NVIDIA DeepStream SDK 9.0 development with Python pyservicemaker API. Use when building video analytics pipelines, GStreamer-based video processing, TensorRT inference integration, object detection/tracking, or Kafka/message broker integration.
|
| deepstream-generate-pipeline
|
| Build DeepStream GStreamer pipelines interactively. Use when the user asks about pipelines for video/image inference, detection, tracking, or streaming — including natural phrases like 'pipeline to infer on image', 'run inference on video', 'detect objects in stream', 'save inference output', 'deepstream pipeline', 'gst-launch pipeline', 'process video with detection', 'build a pipeline', or any request involving GStreamer/DeepStream elements (nvinfer, nvstreammux, nvtracker, etc.).
|
| deepstream-import-vision-model
|
| Use this skill to bring any vision model from HuggingFace or NVIDIA NGC into an NVIDIA DeepStream pipeline with end-to-end automation: ONNX download, SafeTensors export, TRT engine build, custom nvinfer bbox parser, multi-stream benchmark, and PDF report. Object detection models only.
|
| deepstream-profile-pipeline
|
| Profile a DeepStream pipeline with Nsight Systems and derive its configs from the measurement. Use when the user asks for an efficient, performant, or profiled pipeline — or to benchmark, tune, or measure FPS.
|
| deepstream-sop
|
| Use this skill when building, deploying, evaluating, debugging, or measuring latency for the DeepStream SOP Inference Microservice — a GPU-accelerated FastAPI service that detects whether operators perform assembly-line steps in order via event boundary detection (GEBD) plus VLM classification. Trigger even if the user does not name it: verify operator step sequence, detect missing or out-of-order SOP steps, score factory/work-cell video for procedure compliance, run VLM-based SOP checking on industrial cameras, or call /v1/chat/completions with a file, RTSP, or Basler camera. Also trigger for its internals: SOPVideoProcessor, DeepStream GEBD model (e.g. DDM) via Triton CAPI, nvds_custom_postprocess, Cosmos Reason 1/2 vLLM, SSE streaming, Kafka NvProto/JSON output, Basler/Pylon camera + emulation, Docker compose, chunk-level latency. Do NOT trigger for generic DeepStream pipelines, object detection/tracking, NIM imports, or video summarization.
|
| dicom-metadata-extract
|
| Used for extracting selected metadata from one DICOM file and flagging standard-tag PHI presence. Not for anonymization or clinical use.
|
| dicom-series-preflight
|
| Used for header-only preflight of one DICOM series folder before conversion or inference. Not for de-identification or clinical clearance.
|
| dicom-series-to-volume
|
| Used for converting one CT DICOM series folder to a HU NIfTI volume with affine evidence. Not for multi-frame DICOM or clinical use.
|
| digital-health-clinical-asr-build
|
| Stage 2 of the Clinical ASR Flywheel. Use when curating clinical terms, tagging IPA, and synthesizing a NeMo manifest. NOT for scoring (use /digital-health-clinical-asr-eval).
|
| digital-health-clinical-asr-eval
|
| Stage 3 of Clinical ASR Flywheel. Score a NeMo manifest, produce the five-section KER leaderboard (by-ipa_source diagnostic). Not for ASR auth (/riva-asr).
|
| digital-health-clinical-asr-finetune
|
| Stage 4 of the Clinical ASR Flywheel. Use when priority KER is above 0.3 to run stock NeMo SFT on Parakeet TDT v2 and offline cycle N+1 re-eval. NOT for generic word boosting (use /finetune-asr).
|
| digital-health-clinical-asr-setup
|
| Stage 1 of Clinical ASR Flywheel. Use when bootstrapping a cycle: NVCF+MW disclosure, NVIDIA_API_KEY check, deps install, TTS+ASR smoke test.
|
| dynamo-interconnect-check
|
| Validate that a Dynamo deployment's NIXL/UCX/NCCL interconnect is ready for disaggregated serving over RDMA/NVLink. Use after recipe-runner brings a deployment up (especially disagg/multi-node) to confirm the KV transport is correct; use troubleshoot for diagnosing already-failed pods.
|
| dynamo-recipe-runner
|
| Select, validate, patch, and deploy existing NVIDIA Dynamo Kubernetes recipes. Use for model/backend/GPU/deployment-mode recipe bring-up; use router-starter for router-only mode work and troubleshoot for broken deployments.
|
| dynamo-router-starter
|
| Start or patch Dynamo router modes and run router endpoint smoke checks. Use for round-robin, KV-aware, least-loaded, or device-aware routing setup; use recipe-runner for recipe deployment and troubleshoot for failure diagnosis.
|
| dynamo-troubleshoot
|
| Diagnose failed or unhealthy Dynamo deployments. Use when pods, model-cache jobs, PVCs, workers, frontend/router health, endpoints, or benchmark jobs fail; use recipe-runner/router-starter before this for normal bring-up.
|
| earth2studio-create-datasource
|
| Create and validate Earth2Studio data source wrappers (DataSource, ForecastSource, DataFrameSource, ForecastFrameSource) from remote stores. Do NOT use for fetching data with existing sources, model inference, or installation tasks.
|
| earth2studio-create-diagnostic
|
| Create Earth2Studio diagnostic model wrappers for single-step data transformations, including simple derived diagnostics, packaged AutoModel diagnostics, and generative or diffusion diagnostics. Do NOT use for prognostic time-stepping models, data sources, or installation.
|
| earth2studio-create-prognostic
|
| Create Earth2Studio prognostic (time-stepping forecast) model wrappers. Do NOT use for diagnostic models, data sources, or installation.
|
| earth2studio-data-fetch
|
| Fetch weather/climate data via Earth2Studio data sources for specific variables and times. Do NOT use for inference pipelines, model discovery, or installation.
|
| earth2studio-deterministic-forecast
|
| Build deterministic forecast scripts with Earth2Studio (model, data source, IO, inference). Do NOT use for ensemble, diagnostics, data-only fetch, or install.
|
| earth2studio-discover
|
| Find Earth2Studio models, data sources, and examples for a weather/climate use case. Do NOT use for writing inference code, downloading data, or installation.
|
| earth2studio-install
|
| Guide installing Earth2Studio via uv or pip, selecting model extras, and configuring the environment. Do NOT use for writing inference code, choosing models, or PhysicsNeMo questions.
|
| holoscan-install-conda
|
| Install Holoscan SDK v4.3+ via Conda in a CUDA 13 environment. Use for Conda installs; redirect CUDA 12 hosts to container/wheel.
|
| holoscan-install-container
|
| Install Holoscan SDK via the NGC Docker container. Use for container-based installs; not for native apt/pip/Conda installs.
|
| holoscan-install-debian
|
| Install Holoscan SDK natively on Ubuntu via apt. Use for C++ installs on Ubuntu; pair with /holoscan-install-wheel for Python.
|
| holoscan-install-source
|
| Build Holoscan SDK from source via the in-tree ./run script. Use only when published packages don't meet the user's needs.
|
| holoscan-install-wheel
|
| Install Holoscan SDK Python wheel via pip into a venv. Use for Python installs; not for native C++/apt or Conda installs.
|
| holoscan-setup
|
| Guides Holoscan SDK installation: inspects the host, assesses platform compatibility, recommends an install method, and delegates to the matching install skill.
|
| hsb-app
|
| Discover and run Holoscan Sensor Bridge example applications on a connected devkit. Filters available apps by the user's platform, HSB software version, board type, and sensors. Supports timed execution, failure analysis, code-edit suggestions, and iterative re-runs.
|
| hsb-flash
|
| Flash the FPGA on an HSB board connected to an NVIDIA devkit. Supports HSB Lattice boards (FPGA versions 2407, 2412, 2507, 2510) and Leopard Imaging VB1940 "all-in-one" cameras (FPGA versions 2507, 2510). Uses release-specific YAML manifests and board-type-specific program commands. Lattice and VB1940 commands must never be mixed.
|
| hsb-setup
|
| Clone the latest NVIDIA Holoscan Sensor Bridge repo, ask which supported devkit is being used, configure the host per platform, build the correct demo container, run it, and verify HSB connectivity by pinging 192.168.0.2. Use for Holoscan Sensor Bridge setup, build, container launch, and first-connectivity bring-up.
|
| hsb-test
|
| Execute QA test plans on Holoscan Sensor Bridge hardware. Reads a user-provided test document, filters tests by the user's setup, determines which tests can run automatically, executes them with pass/fail evaluation, and produces a structured test results report.
|
| jetson-build-source
|
| Use when you need to rebuild the BSP overlay — DT, OOT modules, or kernel — from changes under bsp_sources/. Triggers: build bsp, rebuild dtb, rebuild kernel.
|
| jetson-customize-camera
|
| Enable MIPI/GMSL camera sensors on a Jetson Thor or Orin custom carrier by rendering a kernel-DT overlay from the in-tree sensor DTSI. Do NOT use for UPHY lane allocation or ODMDATA edits.
|
| jetson-customize-clocks
|
| Use to lock/cap Jetson CPU/GPU/EMC clocks, toggle EMC/CPU DVFS, or change cpufreq governors by editing BPMP DTB and nvpower.sh pre-flash. Do NOT use for live tuning or nvpmodel edits.
|
| jetson-customize-fan
|
| Use when you need to add, remove, edit, list, or change the boot default of an nvfancontrol fan profile on a Jetson/Tegra (Orin, Thor) target. Triggers: edit fan profile, tune fan curve.
|
| jetson-customize-mgbe
|
| Enable Jetson Thor 25G/10G/1G MGBE QSFP via kernel-DT overlay. Do NOT use for UPHY lane allocation or ODMDATA edits.
|
| jetson-customize-nvpmodel
|
| Use when you need to add, remove, edit, list, or change the boot default of an nvpmodel power mode on a Jetson/Tegra (Orin, Thor) target. Triggers: edit power mode, tune frequency caps.
|
| jetson-customize-pcie
|
| Per-controller PCIe enable / disable / lanes / link-speed for a Jetson Thor or Orin custom carrier via ODMDATA + kernel-DT overlay. Do NOT use for UPHY lane allocation or endpoint-mode bring-up.
|
| jetson-customize-pinmux
|
| Per-pin SFIO / direction / initial-state configurator for a Jetson Orin or Thor custom carrier from the pinmux XLSM. Do NOT use for kernel-DT overlay or ODMDATA edits.
|
| jetson-customize-uphy
|
| Configure Jetson UPHY lane allocation (uphy0/uphy1-config) on Orin/Thor custom carriers. Do NOT use for pinmux or PCIe-only edits.
|
| jetson-customize-usb
|
| Enable/disable Jetson USB2/USB3 SS ports via kernel-DT overlay. Do NOT use for UPHY lane allocation or ODMDATA edits.
|
| jetson-derive-carrier
|
| Bootstrap a custom carrier board by forking carrier files and scaffolding a DT overlay from the reference devkit. Use after jetson-init-source; not for module-level or kernel-DTB changes.
|
| jetson-diagnostic
|
| Read-only Jetson health snapshot for identity, memory, GPU, thermal, power, storage, services, and top processes.
|
| jetson-download-bsp
|
| Download NVIDIA Jetson Linux BSP artifacts (BSP tarball, sample rootfs, public_sources, x-tools, guides) for the active target. Use for Auto Setup; not for extraction or profile edits.
|
| jetson-flash-image
|
| Use to flash a promoted BSP image to a Jetson DUT in RCM mode via flash.sh or l4t_initrd_flash.sh. Do NOT use for BSP customization, image promotion, or carrier derivation.
|
| jetson-generate-kb
|
| Build a per-target knowledge-base markdown next to the active profile by walking the BSP root and source tree. Use after init-image / init-source; not for editing profile fields.
|
| jetson-headless-mode
|
| Plan and apply safe Jetson headless-mode changes to reclaim GUI and daemon memory.
|
| jetson-inference-mem-tune
|
| Pick the serving stack and per-runtime memory flags (vLLM, SGLang, llama.cpp, TensorRT Edge-LLM) for an LLM/VLM workload on any NVIDIA Jetson.
|
| jetson-init-image
|
| Extract Jetson Linux + sample-rootfs tarballs and run apply_binaries.sh for the active target, then record bsp_image in the profile. Use after jetson-init-target; not for source-tree setup.
|
| jetson-init-source
|
| Set up the BSP source workspace: Linux_for_Tegra overlay tracker, bsp_sources, Crosstool-NG toolchain. Use after jetson-init-image; not for fetching inputs.
|
| jetson-init-target
|
| Author a new Jetson target-platform profile (reference_devkit + optional custom_carrier) and update the active pointer. Use to create a target; not for switching existing profiles.
|
| jetson-link-docs
|
| Bind pre-downloaded Jetson reference docs (developer guide, design guide, pinmux, schematics) into the active profile documents block. Use after staging docs on disk; not for downloading.
|
| jetson-llm-benchmark
|
| Benchmark Jetson LLM/VLM serving performance across vLLM, llama.cpp, and Ollama with structured JSON output.
|
| jetson-llm-serve
|
| Stand up vLLM or SGLang serving on Jetson, using upstream vLLM on Thor and Orin JetPack 7.2+, and NVIDIA-AI-IOT vLLM on older Orin.
|
| jetson-memory-audit
|
| Measure Jetson DRAM/NvMap usage and verify before/after memory reclamation with live audit data.
|
| jetson-optimize-memory
|
| Reclaim DRAM by disabling unused subsystems across MB1 BCT, MB2 BCT, kernel reserved-memory, and SWIOTLB. Use for headless or no-camera Jetson deployments; not for CPU/GPU frequency tuning.
|
| jetson-package
|
| Pick Jetson-compatible containers, vLLM runtime images, and Jetson AI Lab PyPI indexes; maps Orin SM 8.7 vs Thor SM 11.0 and JetPack-specific package choices.
|
| jetson-print-bsp-info
|
| Use when you need to print Jetson BSP info (L4T version, board configs, rootfs state) from a Linux_for_Tegra root on the host PC. This is an example skill.
|
| jetson-print-device-info
|
| Use when you need to print Jetson device info (module model, L4T version, kernel, OS version, current power mode) from a running Jetson target. This is an example skill.
|
| jetson-promote-image
|
| Use to promote overlay files and built artifacts into the staged BSP image. Do NOT use to flash or build. Triggers: promote bsp image.
|
| jetson-quick-start
|
| Entry skill for Jetson / IGX BSP customization. Asks one core click-to-select setup questionnaire and passes prefilled answers to downstream setup skills.
|
| jetson-set-target
|
| Switch the active Jetson target-platform pointer to an existing profile YAML. Use before customize/build/flash to change target; not for authoring profiles — use jetson-init-target instead.
|
| jetson-speculative-decoding
|
| Add EAGLE-3 or draft-model speculative decoding to a Jetson vLLM server when TPOT is the bottleneck.
|
| jetson-validate-image
|
| Use after jetson-flash-image to run static BSP checks, on-target smoke/regression tests on a flashed DUT, or both. Not for build or flash steps. Triggers: validate bsp, on-target validation.
|
| launch-nemo-rl
|
| Playbook for launching, monitoring, stopping, and debugging NeMo-RL recipes on a Kubernetes cluster via the nrl-k8s CLI. Covers ephemeral vs long-lived RayCluster modes, iterating on runs, and debugging hung or failed training jobs.
|
| mcore-create-issue
|
| Investigate a failing GitHub Actions run or job and create a GitHub issue for the failure.
|
| mcore-linting-and-formatting
|
| Linting and formatting for Megatron-LM. Covers running autoformat.sh, tools (ruff, black, isort, pylint, mypy), and code style rules.
|
| mcore-run-on-slurm
|
| How to launch distributed Megatron-LM training jobs on a SLURM cluster. Covers a minimal sbatch skeleton, environment-variable setup for torch.distributed.run, CUDA_DEVICE_MAX_CONNECTIONS rules across hardware and parallelism modes, container conventions, monitoring, and per-rank failure diagnosis.
|
| mcore-split-pr
|
| Split a PR into multiple PRs to reduce the number of required CODEOWNERS reviewer groups.
|
| mcore-testing
|
| Test system for Megatron-LM. Covers test layout, recipe YAML structure, adding and running unit and functional tests, golden values, marker filters, and CI parity.
|
| nemo-automodel-distributed-training
|
| Guide for selecting and configuring distributed training strategies in NeMo AutoModel, including FSDP2, Megatron FSDP, DDP, and parallelism settings.
|
| nemo-automodel-launcher-config
|
| Configure NeMo AutoModel job launches for interactive runs, Slurm clusters, and SkyPilot cloud execution.
|
| nemo-automodel-model-onboarding
|
| Guide for onboarding new model architectures into NeMo AutoModel, including architecture discovery, implementation patterns, registration, and validation.
|
| nemo-automodel-recipe-development
|
| Create and modify NeMo AutoModel training and evaluation recipes, including YAML structure, builders, and execution flow.
|
| nemo-data-designer-plugin
|
| Use when the user wants to create a dataset, generate synthetic data, or build a data generation pipeline.
|
| nemo-evaluator-plugin
|
| Use when working on the Evaluator plugin CLI, jobs, SDK-backed specs, metric types, or plugin-owned Evaluator skills.
|
| nemo-mbridge-mlm-bridge-training
|
| Run Megatron-LM (MLM) and Megatron Bridge training with mock or real data. Covers correlation testing, available recipes, and multi-GPU examples.
|
| nemo-mbridge-multi-node-slurm
|
| Convert single-node scripts to multi-node Slurm sbatch jobs and debug common multi-node failures. Covers srun-native vs uv run torch.distributed approaches, container setup, NCCL timeouts, OOM sizing for MoE models, and interactive allocation.
|
| nemo-mbridge-perf-activation-recompute
|
| Validate and use selective and full activation recompute in Megatron Bridge to reduce GPU memory usage at the cost of extra compute.
|
| nemo-mbridge-perf-cpu-offloading
|
| Validate and use CPU offloading in Megatron Bridge, including layer-level activation offloading and fractional optimizer state offloading with HybridDeviceOptimizer.
|
| nemo-mbridge-perf-cuda-graphs
|
| Validate and use CUDA graph capture in Megatron Bridge, including local full-iteration graphs and Transformer Engine scoped graphs for attention, MLP, and MoE modules.
|
| nemo-mbridge-perf-expert-parallel-overlap
|
| Validate and use MoE expert-parallel communication overlap in Megatron-Bridge, including overlap_moe_expert_parallel_comm, delay_wgrad_compute, and flex dispatcher backends such as DeepEP and HybridEP.
|
| nemo-mbridge-perf-hierarchical-context-parallel
|
| Operational guide for enabling hierarchical context parallelism in Megatron-Bridge, including config knobs, code anchors, pitfalls, and verification.
|
| nemo-mbridge-perf-megatron-fsdp
|
| Operational guide for enabling Megatron FSDP in Megatron-Bridge, including config knobs, code anchors, pitfalls, and verification.
|
| nemo-mbridge-perf-memory-tuning
|
| Techniques for reducing peak GPU memory in Megatron Bridge — expandable segments, PEFT + SP input re-gather, parallelism resizing, activation recompute, CPU offloading constraints, and common OOM fixes.
|
| nemo-mbridge-perf-moe-comm-overlap
|
| MoE expert-parallel communication overlap in Megatron Bridge. Covers dispatch/combine overlap, flex dispatcher backends, and expert wgrad scheduling.
|
| nemo-mbridge-perf-moe-dispatcher-selection
|
| Choose the right MoE token dispatcher (`alltoall`, DeepEP, or HybridEP) for the hardware, EP degree, and optimization stage. Summarizes patterns from DSV3, Qwen3, Qwen3-Next, and VLM bring-up work.
|
| nemo-mbridge-perf-moe-hardware-configs
|
| Representative MoE training playbooks by hardware platform and model family. Summarizes rounded throughput bands, parallelism patterns, and common tuning stacks.
|
| nemo-mbridge-perf-moe-long-context
|
| Long-context MoE training guidance for Megatron Bridge. Covers CP sizing, selective recompute, dispatcher choices, and practical patterns from DSV3, Qwen3, and Qwen3-Next long-context experiments.
|
| nemo-mbridge-perf-moe-optimization-workflow
|
| Systematic workflow for MoE training optimization in Megatron Bridge, based on the Megatron-Core MoE paper. Covers the Three Walls framework, parallel folding, recompute strategy, dispatcher choice, and CUDA-graph bring-up.
|
| nemo-mbridge-perf-moe-vlm-training
|
| Practical guidance for training MoE VLMs in Megatron Bridge. Compares FSDP and 3D-parallel approaches, using rounded lessons from Qwen3-VL, Qwen3-Next, and other multimodal experiments.
|
| nemo-mbridge-perf-parallelism-strategies
|
| Operational guide for choosing and combining parallelism strategies in Megatron Bridge, including sizing rules, hardware topology mapping, and combined parallelism configuration.
|
| nemo-mbridge-perf-sequence-packing
|
| Validate and use packed sequences and long-context training in Megatron-Bridge, distinguishing offline packed SFT for LLMs from in-batch packing for VLMs, and applying the right CP constraints.
|
| nemo-mbridge-perf-tp-dp-comm-overlap
|
| Operational guide for enabling TP, DP, and PP communication overlap in Megatron-Bridge, including config knobs, code anchors, pitfalls, and verification.
|
| nemo-mbridge-recipe-recommender
|
| Recommend and customize Megatron Bridge recipes for a user's model, GPU count, and training goal. Indexes library recipes (pretrain/SFT/PEFT) and performance recipes.
|
| nemo-mbridge-resiliency
|
| Resiliency features in Megatron Bridge including fault tolerance, straggler detection, in-process restart, preemption, and re-run state machine.
|
| nemo-retriever
|
| Use when the user wants to search, query, extract, transcribe, describe, quote, filter, or aggregate across documents — PDFs, scanned forms / images (`.jpg` `.png` `.tiff`), Office (`.docx` `.pptx`), text (`.html` `.txt`), audio (`.mp3` `.wav` `.m4a`), or video (`.mp4` `.mov`). Prefer this over native Read / Grep for multi-file or non-PDF corpora. Not for: editing files, web browsing, single-file plain-text lookups, fine-tuning.
|
| nemo-rl-auto-research
|
| Autonomous NeMo-RL research agent workflow for directed hypothesis testing and open-ended discovery. Guides agents through the full experiment lifecycle: understanding recipes and environments, wiring RL or NeMo-gym runs, launching reproducible baselines and iterations, analyzing results, preserving human oversight, and using git plus TSV logs as the research ledger. Do NOT use for: bug fixes, code review, documentation, refactoring, dependency updates, or single-file changes.
|
| nemo-rl-brev-etiquette
|
| Brev instance operating guidance for NeMo-RL agents working in /home/ubuntu/RL with limited workspace disk, a larger /ephemeral volume, and optional /home/ubuntu/RL/.env secrets. Use when running nemo-rl-auto-research campaigns, experiments, training jobs, model or dataset downloads, shared cache-heavy commands, log-producing runs, checkpoint generation, W&B or Hugging Face authenticated workflows, or any workflow that may create large files on Brev.
|
| nemo-rl-docs
|
| Documentation conventions for NeMo-RL. Covers docs/index.md updates and docstring format. Do NOT use for: bug fixes, test fixes, dependency bumps, refactoring, CI/CD changes, performance tuning, or any task that does not involve writing or updating documentation.
|
| nemo-rl-session-memory
|
| Manage durable working-session memory for coding agents. Use when a user asks to preserve or recover agent context across disconnects, VS Code restarts, long-running work, handoffs, or any session where important state should be written periodically under the repo's session directory. Do NOT use for: simple questions, short tasks, one-off commands, linting, or code review.
|
| nemoclaw-user-guide
|
| Guides human users' AI agents to the NemoClaw docs MCP server and canonical Fern documentation in Markdown form. Use when users ask how to install, configure, operate, troubleshoot, secure, or learn NemoClaw with an AI coding assistant. Trigger keywords - nemoclaw docs, use nemoclaw with ai agent, nemoclaw mcp docs, nemoclaw install help, nemoclaw quickstart, nemoclaw markdown docs, llms.txt, agent skills.
|
| nemotron-customize
|
| Plan, configure, and chain repo-native Nemotron customization steps into single-step or multi-step pipelines: curation, translation, SFT/PEFT (AutoModel or Megatron-Bridge), pretraining/CPT, RL alignment (DPO/RLVR/GRPO/RLHF), BYOB/MCQ benchmarks, checkpoint conversion, ModelOpt optimization, env profiles, and evaluation of trained checkpoints or existing/hosted endpoints. Use when a request names a Nemotron step or workflow, or asks to clean, translate, train, fine-tune, align, convert, optimize, evaluate, or compose these into a pipeline. Do NOT use for frontend/dashboard/visualization work, generic ML advice, billing/access, or non-Nemotron coding tasks.
|
| nemotron-policy-generator
|
| Generates BYO custom safety policies for NVIDIA Nemotron content-safety guardrails — Nemotron-Content-Safety-Reasoning-4B (text) and multimodal Nemotron-3-Content-Safety. Produces a Markdown policy, JSON taxonomy, and drop-in inference prompts. Maps rough words or an existing policy to V2 categories, adding custom categories or topic-following rules.
|
| nemotron-retrieval-recipes
|
| Use when planning, debugging, tuning, evaluating, exporting, or deploying public Nemotron `embed`/`rerank` retrieval recipes.
|
| nemotron-speech
|
| Routes NVIDIA Nemotron Speech (Riva) NIM tasks — deploys, runs, and tests ASR, TTS, and NMT NIMs on build.nvidia.com or self-hosted.
|
| nv-generate-ct-rflow
|
| Used for generating synthetic CT volumes and masks with NV-Generate-CTMR rflow-ct. Not for production training data without review.
|
| nv-generate-mr
|
| Used for generating synthetic body MRI volumes with NV-Generate-CTMR rflow-mr. Not for paired masks or production training data.
|
| nv-generate-mr-brain
|
| Used for generating synthetic brain MRI volumes with NV-Generate-CTMR rflow-mr-brain. Not for production training data.
|
| nv-generate-mr-brain-finetune
|
| Used for finetuning NV-Generate-CTMR MR-brain diffusion UNet from a NIfTI datalist. Not for clinical or production data approval.
|
| nv-generate-vae-finetune
|
| Used for finetuning the NV-Generate-CTMR MAISI VAE from CT/MRI NIfTI datalists. Not for clinical or production data approval.
|
| nv-reason-cxr
|
| Used for command-shape or live NV-Reason-CXR chest X-ray reasoning smoke tests. Not for diagnosis or clinical reporting.
|
| nv-segment-ct
|
| Used for running NV-Segment-CT VISTA3D on CT NIfTI volumes and recording label-map evidence.
|
| nv-segment-ct-finetune
|
| Used for smoke or dataset finetuning of NV-Segment-CT VISTA3D on CT NIfTI labels. Not for clinical validation.
|
| nv-segment-ctmr
|
| Used for running NV-Segment-CTMR on CT or MRI NIfTI volumes and recording label-map evidence. Not for clinical interpretation.
|
| omniverse-cad-to-simready
|
| Coordinate the end-to-end CAD/source-asset to SimReady workflow. Use for broad requests such as CAD to SimReady, source asset to simulation-ready USD, or prop packaging that require conversion, material/physics assignment, SimReady conformance, validation, and optional package creation; deploy or verify Content Agents services first when property assignment is enabled; route single-stage work through nested references.
|
| omniverse-realtime-viewer
|
| Use as the top-level router for Omniverse Realtime Viewer USD app requests and focused viewer reference documents.
|
| omniverse-usd-performance-tuning
|
| Top-level workflow skill for USD performance diagnosis and optimization. Use for slow loading, high memory, low FPS, or 'optimize my scene' requests; delegates auth/runtime setup to Phase 0 owners.
|
| physical-ai-defect-image-generation
|
| Use when the user wants to orchestrate defect image generation with NVIDIA Cosmos AnomalyGen (Cosmos-Predict2-derived) on OSMO for PCBA, metal surface, and glass inspection. The Day 0 path handles cold-start with USD-to-ROI, image-edit augmentation, and AnomalyGen to create initial PCBA datasets. The Day 1 path performs inference and labeling on real images. This skill helps with first-time asset setup, creation of finetuning checkpoints, and configuring deployment. Trigger keywords: defect image generation, dig workflow, dig pipeline, defect image detection workflow, aoi pipeline, aoi anomalygen, usd2roi anomalygen, day 0 pcba, day 1 pcba, day 1 real-photo alignment, day 1 manual roi, metal surface anomaly, glass defect, anomalygen finetune, setup_pcb, setup_metal, setup_glass, setup_pretrained, dig setup, dig datasets, dig pretrained checkpoint, dig image-edit endpoint, cosmos defect generation, cosmos-predict2 defect, cosmos-anomalygen, cosmos predict2 finetune.
|
| physical-ai-infrastructure-setup-and-resilient-scaling
|
| Use when the user wants to set up, scale, validate, or harden NVIDIA physical AI infrastructure for synthetic data generation workflows across local MicroK8s or Azure AKS, including Kubernetes clusters, inference endpoint deployment, OSMO deployment, workload submission readiness, and infrastructure failure recovery. Trigger keywords: physical ai infrastructure, resilient scaling, SDG infrastructure, microk8s, azure aks, NVCF deployment, NIM Operator, OSMO deploy, workflow scaling. Don't trigger for: OSMO log summarization or workload-only operations unless infrastructure setup, scaling, validation, or recovery is requested.
|
| physical-ai-neural-reconstruction
|
| Router for NVIDIA NuRec/NRE: USDZ rendering, NCore conversion, 3DGS, gRPC sensor sim, PhysicalAI HF datasets. Do NOT use for SimReady or infra setup.
|
| physical-ai-people-attribute-search
|
| Use when running people attribute search (PAS) image augmentation and auto-labeling workflows on OSMO: flow selection, preflight, submit-time interpolation, monitoring, and output retrieval. Trigger keywords: people attribute search, PAS, person augmentation, attribute search, person re-identification, clothing augmentation, person crop augmentation.
|
| physical-ai-video-data-augmentation
|
| Use when running video data augmentation and auto-labeling workflows on OSMO: flow selection, preflight, submit-time interpolation, monitoring, and output retrieval. Trigger keywords: video data augmentation, data enrichment, auto labeling, VDA demo, OSMO workflow, pseudo labeling.
|
| physicsnemo-discover
|
| Official NVIDIA-authored guidance for navigating PhysicsNeMo — pick the model, datapipe, or example for a SciML/AI4Science task (surrogates, forecasting, downscaling, physics-informed, inverse, generative). Points at existing files via live repo search; never writes code. Do NOT use for installation or environment setup, training-loop or other code authoring/scaffolding, contributor/CI/packaging questions, repo-specific questions in physicsnemo-sym/-cfd/-curator, or general (non-physics) ML/PyTorch.
|
| rag-blueprint
|
| NVIDIA RAG Blueprint — deploy, configure, troubleshoot, and manage. Handles any RAG action: deploy, install, start, enable, disable, toggle, change, configure, troubleshoot, debug, fix, shutdown, stop, or tear down any RAG feature or service (Agentic RAG, VLM, guardrails, query rewriting, models, search, ingestion, observability, summarization, reasoning, and more).
|
| rag-eval
|
| Filesystem RAG benchmarks: corpus/, train.json, evaluate_rag.py (RAGAS quality). Not for prod monitoring, latency/throughput benchmarking (use rag-perf), or evals outside this repo layout.
|
| rag-perf
|
| Performance benchmarking for a deployed NVIDIA RAG Blueprint server: profiling pass + aiperf load test driven by a single YAML config. Not for accuracy / RAGAS scoring (use rag-eval) or for deploying / repairing services (use rag-blueprint).
|
| skill-card-generator
|
| Use only to generate or update a governance skill card for a specified existing agent skill directory. Do not use for explaining, listing, comparing, or discussing skill capabilities.
|
| tao-analyze-changenet-rca
|
| Performs deep Root Cause Analysis (RCA) on NVIDIA TAO Visual ChangeNet classification experiments with image-evidence-driven investigation. Use when analyzing ChangeNet model failures, investigating poor recall / FAR / PASS-NO_PASS metrics, auditing visual inspection pipeline quality, or running an RCA report for an AOI defect-detection model. Trigger phrases include "RCA on my ChangeNet model", "why is my AOI model failing", "audit ChangeNet predictions", "investigate FAR regressions", "root cause analysis on visual-changenet".
|
| tao-analyze-gaps-visual-changenet
|
| Performs gap analysis on NVIDIA TAO VCN Classify (Visual Component Net) experiments by invoking the data-services container (`tao_toolkit.data_services` from `versions.yaml`) directly via `docker run … gap_analysis vcn_aoi …` — picks the optimal decision threshold, ranks per-sample weakness, and emits a top-K weakest parquet expanded per-lighting for downstream augmentation. Use when analyzing VCN classification failures, picking SDA augmentation targets, or auditing PASS/NO_PASS boundary cases.
|
| tao-analyze-gaps-vlm-bcq
|
| Extract false-positive and false-negative gaps from VLM binary-classification-question (BCQ, yes/no) predictions. Use when the user asks to "analyze VLM BCQ gaps", "extract VLM false positives and false negatives", or identify failure cases from a predictions JSON for DEFT root-cause analysis on a binary-classification VLM workflow.
|
| tao-convert-dataset-format
|
| Run `tao-daft convert` to convert NVIDIA TAO DAFT datasets between supported formats. Do not use for non-DAFT data. Use when the user asks to convert a DAFT dataset, change DAFT format, change a TAO dataset format, or run `tao-daft convert`.
|
| tao-finetune-clip
|
| CLIP vision-language model for image-text retrieval, zero-shot classification, embedding extraction, ONNX export, and TensorRT deployment. Use when fine-tuning or training CLIP, running zero-shot classification, computing image embeddings, or deploying CLIP to ONNX/TensorRT.
|
| tao-finetune-cosmos-embed
|
| Cosmos-Embed1 video-text embedding for text-to-video retrieval, video-to-video search, semantic deduplication, and fine-tuning. Use when the user asks to "fine-tune Cosmos-Embed1", "run cosmos-embed inference", "export Cosmos-Embed1", "embed videos", or "search videos with text".
|
| tao-finetune-cosmos-reason
|
| Cosmos3-Nano video QA supervised fine-tuning with FSDP parallelism. Use when training or evaluating video question-answering models, fine-tuning Cosmos3-Nano or compatible Cosmos Reason models with SFT/LoRA, or working with Cosmos-RL. Trigger phrases include "fine-tune Cosmos", "Cosmos3 Nano Reasoner", "Cosmos-RL SFT", "video QA fine-tune", "Cosmos3-Nano training".
|
| tao-finetune-huggingface-model
|
| Fine-tune any HuggingFace CV / VLM / LLM model on local NVIDIA GPUs inside an NGC PyTorch container. Use when the user wants to fine-tune a HuggingFace model (full or LoRA), train a vision / VLM / LLM model end-to-end, generate a reproducible HF training pipeline, smoke-test a HuggingFace model locally before scale-up, push a fine-tuned model to the HF Hub with a model card, or emit a self-contained rerun skill for an existing HuggingFace finetune. Supports image classification, object detection, semantic / instance / panoptic segmentation, depth estimation, image-text-to-text VLM (SFT / LoRA), and LLM SFT / DPO / GRPO. Six-step workflow: inspect and qualify, hardware and NGC image, research, generate and smoke, train + eval + infer, push and emit rerun skill.
|
| tao-generate-image-grounding
|
| Two-step image grounding pipeline: extracts referring expressions from (image, caption) pairs and grounds them to pixel-space bounding boxes via a VLM. Use when the user wants to ground captions to bboxes, generate phrase-grounded annotations, auto-label images for grounding, or run the image_grounding pipeline. Triggers include 'image grounding', 'phrase grounding', 'ground captions', 'auto-label image grounding', 'image_grounding'.
|
| tao-generate-referring-expressions
|
| Four-step image referring-expression pipeline: turns images plus KITTI bounding-box labels into region descriptions, scene captions, grounded referring expressions, and (optionally) verified expressions via VLM distillation. Use when the user wants to generate referring-expression annotations from images with KITTI labels, build region descriptions, produce grouped grounding phrases tied to bboxes, run a double-check verification pass on grounding expressions, auto-label traffic / scene images for referring datasets, or run the image_referring_expression pipeline. Triggers include 'referring expression', 'region description', 'KITTI labels', 'spatial relationship annotation', 'auto-label image referring expression', 'image_referring_expression'.
|
| tao-generate-video-reasoning-annotations
|
| Multi-step video annotation pipeline that turns raw videos into Chain-of-Thought training data — multi-level captions, structured descriptions, and QA pairs (MCQ, binary, open-ended) with reasoning traces, via VLM/LLM distillation. Use when the user wants to "create video training data", "generate video QA datasets", "build CoT reasoning traces from videos", "auto-label videos", or run the video_reasoning_annotation pipeline. Triggers include "video annotation", "video CoT", "video QA", "chain-of-thought", "video captioning pipeline", "video distillation".
|
| tao-launch-workflow
|
| Shared launch intake for any TAO workflow or action. Use when the user wants to run TAO AutoML, train, evaluate, infer, export, generate TensorRT engines, or launch DEFT/workflow jobs on an execution platform.
|
| tao-list-capabilities
|
| Answer what the TAO Skill Bank plugin can do by generating the response from packaged application, data, model, AutoML, and platform manifests. Use when the user asks "what can TAO Skill Bank do", "list TAO models", "which TAO workflows are available", or "what supports AutoML".
|
| tao-mine-aoi-images
|
| Runs the DEFT embed-then-mine workflow for VCN AOI iterations — embeds the gap-analysis target parquet, embeds a source pool, and mines nearest-neighbour source images for downstream augmentation. Use as the immediate next step after `tao-route-visual-changenet-samples` when expanding a real-image augmentation queue from the mining subset.
|
| tao-port-huggingface-model
|
| Integrate a HuggingFace Computer Vision model into the NVIDIA TAO Toolkit ecosystem (tao-core config, tao-pytorch trainer, tao-deploy TensorRT pipeline). Use when the user asks to "integrate a HuggingFace model into TAO", "add an HF model to TAO Toolkit", "wire a HuggingFace ViT/DETR/ SegFormer into tao-pytorch", "build a TAO trainer + deploy pipeline for an HF CV model", or pastes a HuggingFace model URL/ID and wants it turned into a TAO model. Covers the full 7-phase loop: prerequisites check, HuggingFace inspection and validation, codebase exploration, tao-core configuration and native trainer implementation, ONNX export plus TensorRT deploy integration, packaging and L0 testing, container-based end-to-end validation, and (conditional) accuracy/latency tuning. Supports classification, object detection, semantic / instance / panoptic segmentation, zero-shot detection, and depth estimation.
|
| tao-route-visual-changenet-samples
|
| Routes the weakest VCN samples (output of `tao-analyze-gaps-visual-changenet`) into per-augmentation-module subsets based on each module's label eligibility. Use when the user asks to "route VCN gap samples", "split AOI gaps for k-NN mining and AnomalyGen", or prepare the immediate next step after DEFT gap analysis in a VCN AOI SDA iteration.
|
| tao-run-automl
|
| Run AutoML / hyperparameter optimization (HPO) for NVIDIA TAO networks using AutoMLRunner. Handles algorithm selection (bayesian, hyperband, asha, bohb, llm, hybrid, autoresearch), WandB experiment tracking, job execution on any TAO SDK platform, result interpretation, and per-rec custom evaluation hooks. Use when the user mentions TAO AutoML, hyperparameter optimization, HPO, automl, automl_settings, AutoMLRunner, tao_automl, bayesian search, hyperband, ASHA, LLM-guided search, autoresearch, or wants to tune training hyperparameters for any TAO network. Platform-agnostic — runs on any SDK (Brev, SLURM, Kubernetes, Docker).
|
| tao-run-automl-deft-pipeline
|
| Run the canonical NVIDIA AOI three-phase training pipeline — Phase 1 AutoML baseline (HPO), Phase 2 DEFT loop (RCA → SDG → mining → plain-train retrain), Phase 3 AutoML refinement on the DEFT-augmented dataset. Use when the user asks to "run the AOI workflow", "fine-tune my PCB AOI model end-to-end", "improve my AOI ChangeNet model", or "AOI workflow with AutoML" request — route here instead of tao-run-deft-aoi directly unless the user explicitly asks for the DEFT loop ONLY (e.g. "run JUST the DEFT loop", "skip AutoML, only DEFT"). Also handles the same three-phase pattern for non-AOI DEFT applications — AutoML baseline then DEFT loop warm-started from AutoML's winning HPs then post-DEFT AutoML refinement on the iteration-augmented dataset. Trigger phrases include "run the AOI workflow", "AOI end-to-end", "AutoML + DEFT", "AutoML then DEFT", "tune hyperparameters then DEFT", "DEFT with AutoML at both ends", "warm-start DEFT", "improve my AOI model".
|
| tao-run-deft-aoi
|
| Run the full DEFT AOI improvement loop for NVIDIA TAO VisualChangeNet / ChangeNet PCB inspection models: baseline evaluate, RCA, Cosmos AnomalyGen / AMP synthetic defects, k-NN mining, retraining, and deployment gating until FAR / recall KPI targets are met. Use for prompts like "run the DEFT loop", "fine-tune until FAR below 0.1% at recall=100%", or "improve my AOI ChangeNet model with RCA and synthetic defects"; do not use for standalone TAO training, one-off inference, generic anomaly generation, or RCA-only analysis.
|
| tao-run-inference-service
|
| Start, query, and stop a network-specific TAO inference microservice ({network_arch}-inference-microservice) by delegating container execution to the appropriate platform skill. Handles container image resolution, job-payload JSON construction, and the service registry. Use when the user wants to run inference on a TAO model checkpoint using a microservice container, deploy a TAO inference endpoint, or stop a running inference container.
|
| tao-run-on-brev
|
| Brev managed GPU instances with Docker support. Use when running TAO training, evaluation, or inference on Brev GPU instances, managing Brev deployments, or dispatching TAO jobs through the Brev CLI. Trigger phrases include "run on Brev", "Brev GPU instance", "submit job to Brev", "Brev CLI deployment".
|
| tao-run-on-kubernetes
|
| Kubernetes execution platform — submits TAO container jobs as single-pod k8s Jobs with NVIDIA GPU scheduling. Use when running on EKS / GKE / AKS / on-prem clusters with the NVIDIA GPU Operator installed, or when integrating TAO into an existing k8s-native ML platform.
|
| tao-run-on-lepton
|
| DGX Cloud Lepton managed GPU compute platform with run/status/cancel interface. Use when submitting TAO jobs to DGX Cloud, dispatching training/eval/inference to Lepton GPU resources, or managing Lepton workspace deployments. Trigger phrases include "run on Lepton", "submit to DGX Cloud", "Lepton job", "managed GPU on DGX Cloud".
|
| tao-run-on-local-docker
|
| Local or remote Docker execution for TAO SDK job containers using a Docker daemon with NVIDIA GPU runtime. Use when running TAO jobs on the current machine, a directly attached Docker host, or a remote GPU box exposed through DOCKER_HOST. Trigger phrases include "run locally", "local Docker", "remote Docker", "use my GPU", "run on my machine", "host Docker daemon".
|
| tao-run-on-slurm
|
| Remote SLURM GPU cluster execution over SSH with sbatch/srun, Pyxis/Enroot containers, and Lustre-backed results. Use when running TAO training/eval/inference jobs on an on-prem or DGX SLURM cluster. Trigger phrases include "run on SLURM", "submit sbatch", "DGX SLURM cluster", "Pyxis/Enroot container", "Lustre dataset".
|
| tao-run-platform
|
| TAO Execution SDK for submitting and monitoring GPU training jobs on supported platforms (Brev, SLURM, local Docker, Kubernetes). Use when the user wants to run TAO jobs through the SDK, get job tracking, S3 I/O wrapping, multi-node distributed training, or platform-specific features that docker-run can't provide. Trigger phrases include "use the TAO SDK", "call tao_sdk", "AutoMLRunner", "ActionWorkflow", "Job handles", "S3 I/O wrapping", "TAO platform run".
|
| tao-setup-nvidia-gpu-host
|
| Host setup for TAO GPU backends. Checks and, after user approval, installs NVIDIA driver branch 580, CUDA Toolkit 13.0, and NVIDIA Container Toolkit 1.19.0 for Docker/local-Docker and Kubernetes GPU worker hosts. The `--check-only` path works on any Linux distribution; `--install` automates debian-family (Ubuntu/Debian/Pop!_OS/Mint/Zorin/Raspbian), rhel-family (Fedora/RHEL/Rocky/AlmaLinux), and suse-family (openSUSE/SLES) hosts, and prints actionable manual-install steps for everything else. Use when the user asks to "set up an NVIDIA GPU host", "check TAO Docker GPU runtime", or prepare a Kubernetes GPU worker for TAO.
|
| tao-train-action-recognition
|
| Action recognition from video sequences. Supports RGB, optical flow, and joint (multi-stream) input types for classifying temporal actions in video clips. Use when training, evaluating, exporting, or running inference on a TAO action-recognition model. Trigger phrases include "train action recognition", "video action classification", "RGB + optical flow action model", "TAO ActionRecognition".
|
| tao-train-bevfusion
|
| BEVFusion for multi-sensor 3D object detection. Fuses LiDAR point clouds and camera images in bird's-eye-view (BEV) space, used in autonomous driving for robust 3D perception. Use when training, evaluating, or running inference for a TAO BEVFusion model. Trigger phrases include "train BEVFusion", "LiDAR + camera fusion", "BEV 3D detection", "multi-sensor 3D perception".
|
| tao-train-centerpose
|
| CenterPose for keypoint / pose estimation. Detects object centers and regresses keypoint locations for 6-DoF object pose estimation. Use when training, evaluating, exporting, or running inference for a TAO CenterPose model. Trigger phrases include "train CenterPose", "6-DoF object pose", "keypoint estimation", "object pose regression".
|
| tao-train-deformable-detr
|
| Deformable DETR for 2D object detection. Uses deformable attention for efficient multi-scale feature processing, lighter than DINO with competitive accuracy. Use when training, evaluating, exporting, quantizing, or running inference for a TAO Deformable-DETR model. Trigger phrases include "train deformable-detr", "Deformable DETR object detection", "lightweight DETR detector".
|
| tao-train-depth-anything-v2
|
| Monocular depth estimation using Metric Depth Anything v2 or Relative Depth Anything architectures. Predicts per-pixel depth from single RGB images. Use when training, evaluating, exporting, or running inference for a TAO monocular depth model. Trigger phrases include "train monocular depth", "DepthAnything v2", "metric depth from single image", "monocular depth estimation".
|
| tao-train-dino
|
| DINO (DETR with Improved DeNoising Anchor Boxes) for 2D object detection. Transformer-based detector with denoising training, multi-scale features, and optional distillation support. Use when training, evaluating, exporting, distilling, quantizing, or running inference for a TAO DINO detector. Trigger phrases include "train DINO", "DETR object detection", "TAO 2D detection", "DINO with distillation".
|
| tao-train-fast-foundation-stereo
|
| Real-time stereo depth estimation using FastFoundationStereo (FFS), the distilled bp2 commercial variant of FoundationStereo. Predicts disparity maps from stereo image pairs with ~10× lower latency than full FoundationStereo. Use when training, evaluating, exporting, or running inference for a TAO FastFoundationStereo (FFS) model. Trigger phrases include "train fast stereo", "real-time stereo disparity", "FastFoundationStereo", "distilled stereo depth".
|
| tao-train-foundation-stereo
|
| Stereo depth estimation using FoundationStereo. Predicts disparity maps from stereo image pairs for 3D reconstruction. Use when training, evaluating, exporting, or running inference for a TAO FoundationStereo model. Trigger phrases include "train stereo depth", "FoundationStereo", "stereo disparity estimation", "3D reconstruction from stereo".
|
| tao-train-grounding-dino
|
| Grounding DINO for open-set object detection. Combines DINO-style detection with a BERT text encoder for language-guided detection — detects objects described by text prompts without a fixed class vocabulary. Use when training, evaluating, exporting, quantizing, or running inference for a TAO Grounding DINO model. Trigger phrases include "train Grounding DINO", "open-vocabulary detection", "text-prompted detector", "language-guided object detection".
|
| tao-train-image-classification
|
| PyTorch-based TAO image classification. Supports a wide range of backbones (FAN, EfficientNet, ResNet, etc.) with distillation and quantization for deployment. Use when training, evaluating, distilling, quantizing, exporting, or running inference for a TAO image-classification (PyT) model. Trigger phrases include "train image classifier", "TAO classification", "ResNet/EfficientNet/FAN backbone classifier", "classification-pyt".
|
| tao-train-mask-auto-encoder
|
| Masked Auto-Encoder (MAE) for self-supervised pretraining and fine-tuning. Masks random patches and reconstructs them to learn visual representations; supports pretrain and finetune stages. Use when training, evaluating, exporting, or running inference for a TAO MAE backbone. Trigger phrases include "pretrain MAE", "self-supervised vision pretraining", "Masked Autoencoder", "Mask Auto-Encoder", "MAE fine-tune".
|
| tao-train-mask-auto-label
|
| MAL (Mask Auto-Label) for weakly-supervised segmentation. Produces segmentation masks from minimal annotations (point or box annotations) using a ViT-MAE backbone. Use when training, evaluating, or running inference for a TAO MAL model. Trigger phrases include "train MAL", "Mask Auto-Label", "weakly-supervised segmentation", "box-prompted segmentation", "minimal-annotation mask prediction".
|
| tao-train-mask-grounding-dino
|
| Mask Grounding DINO for grounded instance segmentation. Extends Grounding DINO with a mask-prediction head for open-set segmentation guided by text prompts. Use when training, evaluating, exporting, quantizing, or running inference for a TAO Mask-Grounding-DINO model. Trigger phrases include "train Mask Grounding DINO", "open-vocabulary segmentation", "text-prompted instance segmentation", "grounded mask DETR".
|
| tao-train-mask2former
|
| Mask2Former for universal image segmentation (panoptic, instance, and semantic). Transformer-based with masked attention for high-quality segmentation results. Use when training, evaluating, exporting, quantizing, or running inference for a TAO Mask2Former model. Trigger phrases include "train Mask2Former", "universal segmentation", "panoptic / instance / semantic segmentation", "masked-attention transformer segmenter".
|
| tao-train-metric-learning-recognition
|
| Metric-learning recognition (ml-recog) for fine-grained visual recognition. Learns embeddings for retrieval-based matching (e.g., retail product recognition) using triplet / contrastive losses. Use when training, evaluating, exporting, or running inference for a TAO metric-learning recognition model. Trigger phrases include "train metric learning", "ml-recog", "retrieval embeddings", "triplet loss recognition", "fine-grained matching".
|
| tao-train-nvdinov2
|
| NVDINOv2 for self-supervised visual representation learning. Trains vision transformers via self-distillation (teacher-student) without labels and produces general-purpose visual features. Use when training, exporting, or running inference for a TAO NVDINOv2 backbone. Trigger phrases include "train NVDINOv2", "self-supervised ViT pretraining", "DINOv2 backbone", "visual representation learning".
|
| tao-train-nvpanoptix3d
|
| NVPanoptix3D for panoptic 3D scene reconstruction from posed RGB images. Produces 3D panoptic segmentation (semantic, instance, and panoptic masks) with occupancy completion. Built on a VGGT backbone with a Mask2Former-style head and 3D frustum reconstruction. Use when training, evaluating, exporting, or running inference for a TAO NVPanoptix3D model. Trigger phrases include "train NVPanoptix3D", "panoptic 3D reconstruction", "3D scene segmentation", "occupancy completion".
|
| tao-train-ocdnet
|
| OCDNet for scene text detection. Detects arbitrary-oriented text regions in natural images using a differentiable binarization approach. Use when training, evaluating, exporting, pruning, quantizing, retraining, or running inference for a TAO OCDNet model. Trigger phrases include "train OCDNet", "scene text detection", "arbitrary-oriented text boxes", "differentiable binarization detector".
|
| tao-train-ocrnet
|
| OCRNet for scene text recognition. Recognizes text content from cropped text-region images and supports CTC and attention-based decoders. Use when training, evaluating, exporting, pruning, quantizing, retraining, or running inference for a TAO OCRNet model. Trigger phrases include "train OCRNet", "scene text recognition", "OCR cropped text", "CTC / attention text decoder".
|
| tao-train-oneformer
|
| OneFormer for universal image segmentation. Unifies panoptic, instance, and semantic segmentation with a single architecture using task-conditioned queries. Use when training, evaluating, exporting, quantizing, or running inference for a TAO OneFormer model. Trigger phrases include "train OneFormer", "universal segmentation", "task-conditioned segmentation", "panoptic / instance / semantic in one model".
|
| tao-train-optical-inspection
|
| Optical Inspection for defect detection using Siamese networks. Compares image pairs to detect manufacturing defects, anomalies, or quality issues. Use when training, evaluating, exporting, or running inference for a TAO Optical Inspection model on AOI / quality-control data. Trigger phrases include "train optical inspection", "AOI defect detection", "Siamese defect classifier", "PCB / manufacturing inspection".
|
| tao-train-pointpillars
|
| PointPillars for 3D object detection from LiDAR point clouds. Encodes point clouds into a pseudo-image via a pillar-based representation, then applies 2D detection — used in autonomous driving and robotics. Use when training, evaluating, exporting, pruning, retraining, or running inference for a TAO PointPillars model. Trigger phrases include "train PointPillars", "LiDAR 3D detection", "point-cloud object detection", "pillar-based 3D detector".
|
| tao-train-pose-classification
|
| Pose classification using ST-GCN (Spatial Temporal Graph Convolutional Network). Classifies skeleton sequences into action categories from pose-keypoint data. Use when training, evaluating, exporting, or running inference for a TAO pose-classification model. Trigger phrases include "train pose classification", "skeleton action recognition", "ST-GCN", "keypoint sequence classifier".
|
| tao-train-reid
|
| Person re-identification (ReID). Learns discriminative embeddings to match the same person across different camera views, based on metric learning. Use when training, evaluating, exporting, or running inference for a TAO person re-identification model. Trigger phrases include "train ReID", "person re-identification", "cross-camera person matching", "ReID embeddings", "person re-id".
|
| tao-train-rtdetr
|
| RT-DETR (Real-Time DEtection TRansformer) for 2D object detection. Designed for real-time inference with competitive accuracy and supports distillation and quantization for deployment optimization. Use when training, evaluating, distilling, quantizing, exporting, or running inference for a TAO RT-DETR model. Trigger phrases include "train RT-DETR", "real-time DETR", "low-latency object detection", "RT-DETR distillation / quantization".
|
| tao-train-segformer
|
| SegFormer for semantic segmentation. Lightweight transformer-based architecture with hierarchical feature extraction, efficient for real-time segmentation tasks. Use when training, evaluating, exporting, quantizing, or running inference for a TAO SegFormer model. Trigger phrases include "train SegFormer", "semantic segmentation", "lightweight transformer segmenter", "real-time semantic segmentation".
|
| tao-train-single-step
|
| Standard single-step train/eval/export workflow for any TAO model. Use when training a TAO model on a dataset without iterative data augmentation, AutoML, or DEFT loops. Trigger phrases include "single train run", "train then evaluate then export", "plain TAO training", "normal training", "no AutoML", "skip the loop". Routes through the per-model SKILL.md for action specifics and through `tao-launch-workflow` for platform/credentials/dataset intake.
|
| tao-train-sparse4d
|
| Sparse4D for multi-camera temporal 3D object detection and tracking. Uses sparse queries with deformable attention across camera views and time for end-to-end 3D perception, with an instance bank for temporal tracking. Use when training, evaluating, exporting, quantizing, or running inference for a TAO Sparse4D model. Trigger phrases include "train Sparse4D", "multi-camera 3D detection", "temporal 3D tracker", "sparse query 3D perception".
|
| tao-train-visual-changenet
|
| Visual ChangeNet for binary image classification and segmentation in AOI defect detection. Use when training, evaluating, exporting, or running inference for PCB defect detection or visual inspection, comparing image pairs for PASS/NO_PASS classification, or producing change-segmentation masks. Trigger phrases include "train Visual ChangeNet", "ChangeNet classify", "ChangeNet segment", "AOI defect detection", "PCB inspection model".
|
| tao-validate-dataset-format
|
| Run `tao-daft validate` to check NVIDIA TAO DAFT datasets for structure, schema, and cross-reference errors. Do not use for non-DAFT formats. Use when the user asks to validate a DAFT dataset, check DAFT schema, validate a TAO dataset format, or run `tao-daft validate`.
|
| tilegym-adding-cutile-kernel
|
| Add a new cuTile GPU kernel operator to TileGym. Covers dispatch registration in ops.py, cuTile backend implementation, **init**.py exports, test creation, and benchmark in tests/benchmark. Use when adding, creating, or implementing a new cuTile operator/kernel in TileGym, or when asking how to register a new cuTile op.
|
| tilegym-converting-cutile-to-julia
|
| Converts cuTile Python GPU kernels (@ct.kernel) to cuTile.jl Julia equivalents. Handles kernel syntax translation, 0-indexed to 1-indexed conversion, broadcasting differences, memory layout (row-major to column-major), type system mapping, and launch API differences. Use when converting, porting, or translating cuTile Python kernels to Julia cuTile.jl, or debugging/optimizing existing Julia cuTile translations.
|
| tilegym-converting-cutile-to-triton
|
| Converts cuTile GPU kernels (@ct.kernel) to Triton (@triton.jit). Handles standard in-repo conversion, debugging (cudaErrorIllegalAddress, shape mismatch, numerical mismatch), and mapping cuTile idioms (ct.load/ct.store, ct.Constant, ct.launch) to Triton equivalents. Covers dual-kernel layout flags (e.g. transpose=True/False + autotune grid via META) per translations/advanced-patterns.md. Use when converting, porting, or translating cuTile kernels to Triton, or debugging existing Triton translations.
|
| tilegym-cutile-autotuning
|
| Use when adding, modifying, optimizing, or debugging CuTile autotuning code. Trigger signals: `exhaustive_search` / `replace_hints` / `hints_fn` / `cuda.tile.tune` in code, `autotune` in filenames, or correctness/performance issues in autotuned CuTile kernels. Covers: tune-once/cache/launch pattern, per-architecture configs (sm80–sm120), parameter space design (tile sizes, occupancy, num_ctas), and 7 common pitfalls with solutions.
|
| tilegym-cutile-python
|
| Expert cuTile programming assistant. Write high-performance GPU kernels using cuTile's tile-based programming model with proper validation and optimization. Supports deep agent orchestration for complex multi-kernel tasks.
|
| tilegym-improve-cutile-kernel-perf
|
| Iteratively optimize cuTile kernel performance through systematic profiling, bottleneck analysis, IR comparison, and targeted tuning. Covers tile sizes, occupancy, autotune configs, TMA, latency hints, persistent scheduling, num_ctas, flush_to_zero, and IR-level debugging. Use when asked to "optimize cutile kernel", "improve kernel perf", "tune cutile performance", "make kernel faster", or iteratively benchmark and refine a cuTile GPU kernel in the TileGym project.
|
| tilegym-monkey-patch-kernels-to-transformers
|
| Integrate TileGym kernels into Hugging Face `transformers` models by replacing the library's submodule(s) and certain class(es)' implementations, and patching certain class(es)' init/forward/load weight methods prior to instantiating models. Used when the user requires integrating TileGym kernels into `transformers` models.
|
| vss-ask-video
|
| Use this skill to ask the VSS agent's video_understanding tool a fresh visual question about a recorded clip. Not for prior tool output, search hits, or metadata-answerable questions.
|
| vss-deploy-dense-captioning
|
| Use this skill when deploying standalone RT-VLM dense captioning or calling its REST API (uploads, captions, streams, chat-completions, Kafka). Not for VSS profile deploy or video-search ingestion.
|
| vss-deploy-detection-tracking-2d
|
| Use this skill when the user wants to deploy, run, debug, tear down, or call the REST API of the RTVI-CV 2D detection / tracking microservice. Trigger when the user says things like 'deploy rtvi-cv', 'start warehouse 2d', 'add a stream', 'check rtvi-cv health', or 'stop the perception container'. Not for VLM, embedding, or analytics — use the matching vss-* skill.
|
| vss-deploy-detection-tracking-3d
|
| Deploy and operate the RTVI-CV-3D microservice as MV3DT (`MODE=mv3dt`): per-camera DeepStream perception plus BEV Fusion over calibrated cameras. Supports the bundled sample dataset, custom video files, and RTSP streams, and chains to `vss-generate-video-calibration` when calibration is missing. Use `vss-deploy-profile` for the full warehouse blueprint and `vss-deploy-detection-tracking-2d` for single-camera 2D detection.
|
| vss-deploy-profile
|
| Use to select, configure, deploy, verify, debug, or tear down a VSS profile (base, search, lvs, warehouse, edge). Not for standalone microservices — use the vss-deploy-* skill.
|
| vss-deploy-video-embedding
|
| Use this skill when deploying, operating, or integrating the VSS 3.2 GA RT-Embed Video Embedding microservice. Covers Docker Compose bring-up, GPU and storage prerequisites, the `/v1` REST API (file uploads, text and video embeddings, live RTSP streams, health and metrics), Redis/Kafka/OTel integration, common failure modes, and teardown.
|
| vss-generate-video-calibration
|
| Use to run AutoMagicCalib on local MP4s, RTSP, or the bundled sample dataset, and to deploy vss-auto-calibration when needed. Do not use for non-AMC calibration or runtime analytics.
|
| vss-generate-video-report
|
| Use this skill when producing a VSS analysis report — Mode A per-clip VLM, Mode B incident-range via video-analytics. Not for standalone video summarization, real-time alerts or ad-hoc Q&A.
|
| vss-manage-alerts
|
| Use for VSS alert workflows — real-time monitoring, Alert-Bridge subscriptions, Slack notifications, incident queries, camera onboarding. Not for non-alert analytics.
|
| vss-manage-video-io-storage
|
| Use to call the VIOS REST API (sensor list, timelines, clip extraction, snapshots, add/delete sensors and streams). Not for VLM inference or search.
|
| vss-query-analytics
|
| Use this skill when reading video-analytics metrics, incidents, alerts, and sensor data via the VA-MCP server (port 9901). Not for live VLM or incident-range narrative reports.
|
| vss-search-archive
|
| Use this skill to run top-level VSS fusion search on archived video, or to ingest video files / RTSP streams for search. Do NOT use for ad-hoc visual Q&A (use vss-ask-video), live captioning (use vss-deploy-dense-captioning), or video summarization and reports (use vss-summarize-video).
|
| vss-setup-behavior-analytics
|
| Use to deploy the vss-behavior-analytics service standalone (entrypoint, config-source, optional calibration). Not for the full warehouse deploy.
|
| vss-setup-video-analytics-api
|
| Use to deploy the vss-video-analytics-api REST service standalone (config-source, data-log bind, Elasticsearch, optional Kafka). Not for full warehouse deploy.
|
| vss-summarize-video
|
| Use to summarize a recorded video via the LVS summarization microservice (HITL-gated) with a VLM fallback. Not for report generation or live RTSP captioning.

|
