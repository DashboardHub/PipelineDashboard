<?php

/**
 * Class Robo
 * @package Test
 */
class RoboFile extends \Robo\Tasks
{

    public function parallelRun()
    {
        // @TODO: Use make commands?
        // @TODO: Bug failing process -> successful build
        $this->taskParallelExec()
            ->process('bin/phpspec run  --config test/phpspec.yml --format=pretty')
            ->process('bin/behat --config test/behat.yml --suite=quickstart_app --format=pretty')
            ->process('bin/phpunit --configuration app')
            ->printed()
            ->run();
    }
}
